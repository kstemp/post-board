import React from 'react';

import CommentList from '../CommentList/CommentList';
import Button from '../../controls/Button/Button';

import { TPost, IDType } from '../../entities/types';

import { prettyPrintDateDifference } from '../../util/date';
import { ReducerStateType } from '../../entities/reducer';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { isLoggedIn } from '../../entities/selectors';
import { fetchMetadataForPostID, fetchPostByID } from '../../entities/posts';

import { createReactionForEntityID } from '../../entities/reactions';
import { displayErrorNotification } from '../../util/notification';
import Dropdown from '../../controls/Dropdown/Dropdown';

import './Post.scss';

const baseClassName = 'post';

interface OwnProps {
	entity_id: IDType;
}

interface StateProps {
	isLoggedIn: boolean;
}

interface State {
	showComments: boolean;
	liked: boolean;
	numberOfComments: number;
	numberOfReactions: number;
	post?: TPost;
}

type Props = OwnProps & StateProps;

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

	fetchPost = () => {
		console.log('fetching post... ');
		fetchPostByID(this.props.entity_id)
			.then((post: any) => {
				console.log('my post: ', post);
				return this.setState({ post: post });
			})
			.catch(err => displayErrorNotification(err));
	};
	//TODO types etc.
	fetchMetadata = () => 0;

	/*
		fetchMetadataForPostID(this.state.post.entity_id)
			.then((metadata: any) =>
				this.setState({
					numberOfComments: (metadata as any).commentCount,
					numberOfReactions: (metadata as any).reactionCount
				})
			)
			.catch(err => console.log(err));*/

	componentDidMount() {
		this.fetchPost();
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
		/*
		createReactionForEntityID(this.state.post.entity_id)
			.then(() => {
				this.setState({
					liked: !this.state.liked
				});
			})
			.catch(error => displayErrorNotification(error));
		////*/
	};

	render() {
		return this.state.post ? (
			<div className={`${baseClassName}`}>
				<div className={`${baseClassName}__header`}>
					<span className={`${baseClassName}__header-user`}>
						{this.state.post.login ? (
							<NavLink to={`/user/${this.state.post.login}`}>
								<b>{this.state.post.login}</b>
							</NavLink>
						) : (
							'Anonymous'
						)}
					</span>
					<span className={`${baseClassName}__header-id`}>
						#{this.state.post.entity_id}
					</span>
					<span className={`${baseClassName}__header-time`}>
						{`${prettyPrintDateDifference(
							new Date(this.state.post.created_on),
							new Date()
						)}`}
					</span>
				</div>
				<div className={`${baseClassName}__body`}>
					{this.state.post.text}
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
						<Dropdown
							controller={
								<Button
									icon={'more_horiz'}
									toolTipEnabled={'More options'}
								/>
							}
						>
							<Button
								icon={'edit'}
								label={'Edit'}
								disabled={!this.props.isLoggedIn}
							/>
							<Button
								icon={'delete'}
								label={'Delete'}
								disabled={!this.props.isLoggedIn}
							/>
							<Button
								icon={'report'}
								label={'Report'}
								onClick={() => console.log('hej!')}
							/>
						</Dropdown>
					</div>
				</div>
				{this.state.showComments && (
					<CommentList
						postID={this.state.post.entity_id}
						onUpdate={this.updateCommentList}
					/>
				)}
			</div>
		) : (
			<span>No post loaded.</span>
		);
	}
}

const mapStateToProps = (state: ReducerStateType) => {
	return {
		isLoggedIn: isLoggedIn(state)
	};
};

export default connect(mapStateToProps)(Post);
