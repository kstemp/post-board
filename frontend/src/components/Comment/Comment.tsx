import React from 'react';

import { TComment } from '../../entities/types';

import './Comment.scss';
import { prettyPrintDateDifference } from '../../util/date';
import Button from '../../controls/Button/Button';
import Input from '../../controls/Input/Input';
import {
	fetchCommentsForPostIDAndParentCommentID,
	createCommentForPostIDAndParentCommentID
} from '../../entities/fetchers';
import { FetchError } from '../../entities/entity';
import { displayErrorNotification } from '../../util/notification';
import { connect } from 'react-redux';
import { ReducerStateType } from '../../entities/reducer';
import { isLoggedIn } from '../../entities/selectors';
import {
	deleteReactionForEntityID,
	createReactionForEntityID
} from '../../entities/reactions';

const baseClassName = 'comment';

interface OwnProps {
	comment: TComment;
}

interface StateProps {
	isLoggedIn: boolean;
}

type Props = OwnProps & StateProps;

interface State {
	comments?: TComment[];
	displayChildComments: boolean;
}

class Comment extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			displayChildComments: false
		};
	}

	createComment = (text: string) =>
		createCommentForPostIDAndParentCommentID(
			this.props.comment.parent_post_id,
			this.props.comment.entity_id,
			text
		)
			.then(comment =>
				this.setState({
					comments: [...(this.state.comments || []), comment] // this || [] is to make TypeScript happy, since this.state.coomments can be undefined... TODO fix
				})
			)
			.catch((error: FetchError) =>
				displayErrorNotification('Failed to create comment', error)
			);

	openInputFieldAndLoadComments = () => {
		this.setState({
			displayChildComments: true
		});
		fetchCommentsForPostIDAndParentCommentID(
			this.props.comment.parent_post_id,
			this.props.comment.entity_id
		)
			.then(comments => this.setState({ comments: comments }))
			.catch((error: FetchError) =>
				displayErrorNotification(
					'Failed to fetch child comments',
					error
				)
			);
	};

	toggleLiked = () =>
		this.props.comment.reacted
			? deleteReactionForEntityID(this.props.comment.entity_id)
					.then(() => {})
					.catch((error: FetchError) =>
						displayErrorNotification('Failed to react', error)
					)
			: createReactionForEntityID(this.props.comment.entity_id)
					.then(() => {})
					.catch((error: FetchError) =>
						displayErrorNotification('Failed to react', error)
					);

	closeChildComments = () => this.setState({ displayChildComments: false });

	render() {
		return (
			<div className={baseClassName}>
				<div className={`${baseClassName}__header`}>
					<span className={`${baseClassName}__header-login`}>
						{this.props.comment.user_id || 'Anonymous'}
					</span>
					<span className={`${baseClassName}__header-created-on`}>
						{prettyPrintDateDifference(
							new Date(this.props.comment.created_on),
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
					{this.props.comment.text}
				</span>
				<div className={`${baseClassName}__buttons`}>
					<Button
						label={(
							this.props.comment.reaction_count || 0
						).toString()}
						icon={`favorite${
							this.props.comment.reacted ? '' : '_border'
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
						label={(
							this.props.comment.comment_count || 0
						).toString()}
						onClick={this.openInputFieldAndLoadComments}
					/>
					<Button icon={'report'} label={'Report'} />
				</div>
				{this.state.displayChildComments && (
					<div className={`${baseClassName}__input-wrapper`}>
						<Input
							placeholder={'Comment text goes here'}
							required
							onSubmit={this.createComment}
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
