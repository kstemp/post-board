import React from 'react';

import CommentList from '../CommentList/CommentList';
import Button from '../../controls/Button/Button';

import { TPost, IDType } from '../../entities/types';

import { prettyPrintDateDifference } from '../../util/date';
import { ReducerStateType } from '../../entities/reducer';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { isLoggedIn } from '../../entities/selectors';
import { fetchPostByID, fetchMetadataForPostID } from '../../entities/fetchers';

import { createReactionForEntityID } from '../../entities/reactions';
import { displayErrorNotification } from '../../util/notification';

import './Post.scss';
import DropdownWithUserOptions from '../DropdownWithUserOptions/DropdownWithUserOptions';

const baseClassName = 'post';

interface OwnProps {
	entity_id: IDType;
	communityName?: string;
}

interface StateProps {
	isLoggedIn: boolean;
}

interface State {
	showComments: boolean;
	liked: boolean;
	post?: TPost;
}

type Props = OwnProps & StateProps;

class Post extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			showComments: false,
			liked: false
		};
	}

	fetchPost = () => {
		//console.log('fetching post... ');
		fetchPostByID(this.props.entity_id)
			.then((post: any) => {
				console.log('my post: ', post);
				return this.setState({ post: post });
			})
			.catch(err => displayErrorNotification(err));
	};

	fetchMetadata = () =>
		fetchMetadataForPostID(this.props.entity_id)
			.then((metadata: any) =>
				this.setState({
					post: {
						...(this.state.post as any), // TODO...
						comment_count: metadata.comment_count,
						reaction_count: metadata.reaction_count
					}
				})
			)
			.catch(err => displayErrorNotification(err));

	componentDidMount() {
		this.fetchPost();
	}

	updateCommentList = () => {
		this.fetchMetadata();
	};

	toggleShowComments = () => {
		this.setState({
			showComments: !this.state.showComments
		});
	};

	toggleLiked = () =>
		this.state.post &&
		createReactionForEntityID(this.state.post.entity_id)
			.then(() => this.fetchMetadata())
			.catch(err => displayErrorNotification(err));
	/*
		createReactionForEntityID(this.state.post.entity_id)
			.then(() => {
				this.setState({
					liked: !this.state.liked
				});
			})
			.catch(error => displayErrorNotification(error));
		////*/

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
						{prettyPrintDateDifference(
							new Date(this.state.post.created_on),
							new Date()
						)}
					</span>
				</div>
				<div className={`${baseClassName}__body`}>
					{this.state.post.text}
				</div>
				<div className={`${baseClassName}__buttons`}>
					<div className={`${baseClassName}__buttons-left`}>
						<Button
							size={'nice-rectangle'}
							icon={`favorite${
								this.state.liked ? '' : '_border'
							}`}
							label={this.state.post.reaction_count.toString()}
							disabled={!this.props.isLoggedIn}
							toolTipEnabled={'React'}
							toolTipDisabled={
								'You must be logged in to react to posts'
							}
							onClick={this.toggleLiked}
						/>
						<Button
							size={'nice-rectangle'}
							icon={'chat_bubble_outline'}
							label={this.state.post.comment_count.toString()}
							toolTipEnabled={'Comment'}
							onClick={this.toggleShowComments}
						/>
					</div>
					<div className={`${baseClassName}__buttons-right`}>
						<Button
							size={'square'}
							icon={'link'}
							toolTipEnabled={'Tag'}
							//	label={'Link'}
						/>
						<DropdownWithUserOptions
							entityType={'post'}
							entityID={this.state.post.entity_id}
						/>
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
			<p>Loading... TODO </p> // TODO
		);
	}
}

const mapStateToProps = (state: ReducerStateType) => {
	return {
		isLoggedIn: isLoggedIn(state)
	};
};

/*controller={
	<Button
			icon={'more_horiz'}
		toolTipEnabled={'More options'}
								/>
							}*/

export default connect(mapStateToProps)(Post);
