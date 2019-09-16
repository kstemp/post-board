import React from 'react';

import CommentList from '../CommentList/CommentList';
import Button from '../../controls/Button/Button';

import { TPost } from '../../entities/types';

import { prettyPrintDateDifference } from '../../util/date';
import { ReducerStateType } from '../../entities/reducer';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { isLoggedIn } from '../../entities/selectors';
import { fetchMetadataForPostID } from '../../entities/posts';

import './Post.scss';
import { createReactionForEntityID } from '../../entities/reactions';
import { displayErrorNotification } from '../../util/notification';

const baseClassName = 'post';

interface StateProps {
	post: TPost;
	isLoggedIn: boolean;
}

interface State {
	showComments: boolean;
	liked: boolean;
	numberOfComments: number;
	numberOfReactions: number;
}

type Props = StateProps;

class Post extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			showComments: false,
			liked: false,
			numberOfComments: 0,
			numberOfReactions: 0
		};
	}
	//TODO types etc.
	fetchMetadata = () =>
		fetchMetadataForPostID(this.props.post.entity_id)
			.then((metadata: any) =>
				this.setState({
					numberOfComments: (metadata as any).commentCount,
					numberOfReactions: (metadata as any).reactionCount
				})
			)
			.catch(err => console.log(err));

	componentDidMount() {
		this.updateCommentList();
	}

	updateCommentList = () => {
		this.fetchMetadata();
	};

	toggleShowComments = () => {
		this.setState({
			showComments: !this.state.showComments
		});
	};

	toggleLiked = () => {
		createReactionForEntityID(this.props.post.entity_id)
			.then(() => {
				this.setState({
					liked: !this.state.liked
				});
			})
			.catch(error => displayErrorNotification(error));
		////
	};

	render() {
		return (
			<div className={`${baseClassName}`}>
				<div className={`${baseClassName}__header`}>
					<span className={`${baseClassName}__header-user`}>
						{this.props.post.login ? (
							<NavLink to={`/user/${this.props.post.login}`}>
								<b>{this.props.post.login}</b>
							</NavLink>
						) : (
							'Anonymous'
						)}
					</span>
					<span className={`${baseClassName}__header-id`}>
						#{this.props.post.entity_id}
					</span>
					<span className={`${baseClassName}__header-time`}>
						{`${prettyPrintDateDifference(
							new Date(this.props.post.created_on),
							new Date()
						)}`}
					</span>
				</div>
				<div className={`${baseClassName}__body`}>
					{this.props.post.text}
				</div>
				<div className={`${baseClassName}__buttons`}>
					<div className={`${baseClassName}__buttons-left`}>
						<Button
							icon={`favorite${
								this.state.liked ? '' : '_border'
							}`}
							label={'0'}
							disabled={!this.props.isLoggedIn}
							toolTipEnabled={'React'}
							toolTipDisabled={
								'You must be logged in to react to posts'
							}
							onClick={this.toggleLiked}
						/>
						<Button
							icon={'chat_bubble_outline'}
							label={this.state.numberOfComments.toString()}
							toolTipEnabled={'Comment'}
							onClick={this.toggleShowComments}
						/>
					</div>
					<div className={`${baseClassName}__buttons-right`}>
						<Button
							icon={'link'}
							toolTipEnabled={'Tag'}
							//	label={'Link'}
						/>
						<div className={'dropdown'}>
							<Button
								icon={'more_horiz'}
								toolTipEnabled={'More options'}
								//	label={'Link'}
							/>
							<div className={'dropdown-content'}>
								<Button
									//fill
									icon={'edit'}
									//	toolTipEnabled={'More options'}
									label={'Edit'}
									disabled={!this.props.isLoggedIn}
								/>
								<Button
									//fill
									icon={'delete'}
									//toolTipEnabled={'More options'}
									label={'Delete'}
									disabled={!this.props.isLoggedIn}
								/>
								<Button
									//fill
									icon={'report'}
									//toolTipEnabled={'More options'}
									label={'Report'}
								/>
							</div>
						</div>
					</div>
				</div>
				{this.state.showComments && (
					<CommentList
						postID={this.props.post.entity_id}
						onUpdate={this.updateCommentList}
					/>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state: ReducerStateType) => {
	return {
		isLoggedIn: isLoggedIn(state)
	};
};

export default connect(mapStateToProps)(Post);
