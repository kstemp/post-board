import React from 'react';

import './Comment.scss';
import { prettyPrintDateDifference } from '../../util/date';
import Button from '../../controls/Button/Button';
import { FetchError } from '../../entities/entity';
import { displayErrorNotification } from '../../util/notification';
import { connect } from 'react-redux';
import { ReducerStateType } from '../../entities/reducer';
import { isLoggedIn } from '../../entities/selectors';
import {
	createReactionForEntityID,
	deleteReactionForEntityID
} from '../../entities/reactions';
import { TEntity } from '../../entities/types';
import {
	fetchEntitiesByParentID,
	createCommentForParentID
} from '../../entities/fetchers';
import Input from '../../controls/Input/Input';
import { getClassNames } from '../../util/class-names';

const baseClassName = 'comment';

interface OwnProps {
	comment: TEntity;
}

interface StateProps {
	isLoggedIn: boolean;
}

type Props = OwnProps & StateProps;

interface State {
	comment: TEntity;
	comments?: TEntity[];
	displayChildComments: boolean;
}

class Comment extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			comment: this.props.comment,
			displayChildComments: false
		};
	}

	createComment = async (text: string) => {
		try {
			const comment = await createCommentForParentID(
				this.state.comment.entity_id,
				text
			);
			this.setState({
				comments: [...(this.state.comments || []), comment] // this || [] is to make TypeScript happy, since this.state.coomments can be undefined... TODO fix
			});
		} catch (error) {
			displayErrorNotification('Failed to create comment', error);
		}
	};

	openInputFieldAndLoadComments = async () => {
		this.setState({
			displayChildComments: true
		});

		try {
			const comments = await fetchEntitiesByParentID(
				this.state.comment.entity_id
			);
			this.setState({ comments: comments });
		} catch (error) {
			displayErrorNotification('Failed to fetch child comments', error);
		}
	};

	toggleLiked = async () => {
		if (this.state.comment) {
			try {
				if (this.state.comment.reacted) {
					await deleteReactionForEntityID(
						this.state.comment.entity_id
					);
					this.setState({
						comment: {
							...this.state.comment,
							reaction_count:
								this.state.comment.reaction_count - 1,
							reacted: false
						}
					});
				} else {
					await createReactionForEntityID(
						this.state.comment.entity_id
					);
					this.setState({
						comment: {
							...this.state.comment,
							reaction_count:
								this.state.comment.reaction_count + 1,
							reacted: true
						}
					});
				}
			} catch (error) {
				displayErrorNotification('Failed to react', error);
			}
		}
	};

	closeChildComments = () => this.setState({ displayChildComments: false });

	render() {
		return (
			<div className={baseClassName}>
				<div className={`${baseClassName}__header`}>
					<span className={`${baseClassName}__header-login`}>
						{this.state.comment.user_id || 'Anonymous'}
					</span>
					<span className={`${baseClassName}__header-created-on`}>
						{prettyPrintDateDifference(
							new Date(this.state.comment.created_on),
							new Date()
						)}
					</span>
				</div>
				<div
					className={`${baseClassName}__thread-line`}
					onClick={this.closeChildComments}
					title={'Collapse thread to parent comment'}
				/>
				<span className={`${baseClassName}__content`}>
					{this.state.comment.content}
				</span>
				<div className={`${baseClassName}__buttons`}>
					<Button
						label={(
							this.state.comment.reaction_count || 0
						).toString()}
						icon={`favorite${
							this.state.comment.reacted ? '' : '_border'
						}`}
						onClick={this.toggleLiked}
						disabled={!this.props.isLoggedIn}
						toolTipEnabled={'Like'}
						toolTipDisabled={
							'You must be logged in to react to comments'
						}
					/>
					<Button
						icon={'chat_bubble_outline'}
						label={this.state.comment.child_count.toString()}
						onClick={this.openInputFieldAndLoadComments}
					/>
					<Button icon={'report'} label={'Report'} />
				</div>
				{this.state.displayChildComments && (
					<div className={`${baseClassName}__input-wrapper`}>
						<Input
							autoFocus
							className={'pb-input'}
							placeholder={'Comment text goes here'}
							required
							onInputSubmit={this.createComment}
						/>
					</div>
				)}
				{this.state.displayChildComments &&
					this.state.comments &&
					this.state.comments.map(comment => (
						<Comment
							isLoggedIn={this.props.isLoggedIn}
							comment={comment}
						/> // TODO figure out a better workaround around Redux not liking recursive components
					))}
			</div>
		);
	}
}

const mapStateToProps = (state: ReducerStateType) => ({
	isLoggedIn: isLoggedIn(state)
});

export default connect(mapStateToProps)(Comment);
