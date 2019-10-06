import React from 'react';

import CommentList from '../CommentList/CommentList';
import Button from '../../controls/Button/Button';

import { IDType, IUser, TEntity } from '../../entities/types';

import { prettyPrintDateDifference } from '../../util/date';
import { ReducerStateType } from '../../entities/reducer';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { isLoggedIn } from '../../entities/selectors';
import { fetchUser, fetchEntityByID } from '../../entities/fetchers';

import {
	createReactionForEntityID,
	deleteReactionForEntityID
} from '../../entities/reactions';
import { displayErrorNotification } from '../../util/notification';

import './Post.scss';
import { BACKEND_URL } from '../../Config';
import { getClassNames } from '../../util/class-names';
const baseClassName = 'post';

interface OwnProps {
	//entity_id: IDType;
	post: TEntity;
}

interface StateProps {
	isLoggedIn: boolean;
}

interface State {
	showComments: boolean;
	post: TEntity;
	userData: IUser | null;
}

type Props = OwnProps & StateProps;

class Post extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			post: this.props.post,
			showComments: false,
			userData: null
		};
	}

	/*fetchPost = async () => {
		try {
			const post = await fetchEntityByID(this.props.entity_id);
			const userData = post.user_id
				? await fetchUser(post.user_id)
				: null;

			return this.setState({
				post: post,
				userData: userData
			});
		} catch (error) {
			return displayErrorNotification('Failed to load post', error);
		}
	};*/

	/*componentDidMount() {
		this.fetchPost();
	}*/

	toggleShowComments = () =>
		this.setState({
			showComments: !this.state.showComments
		});

	// TODO merge method with post and comment
	toggleLiked = async () => {
		if (this.state.post) {
			try {
				if (this.state.post.reacted) {
					await deleteReactionForEntityID(this.state.post.entity_id);
					this.setState({
						post: {
							...this.state.post,
							reaction_count: this.state.post.reaction_count - 1,
							reacted: false
						}
					});
				} else {
					await createReactionForEntityID(this.state.post.entity_id);
					this.setState({
						post: {
							...this.state.post,
							reaction_count: this.state.post.reaction_count + 1,
							reacted: true
						}
					});
				}
			} catch (error) {
				displayErrorNotification('Failed to react', error);
			}
		}
	};

	render() {
		return this.state.post ? (
			<div className={`${baseClassName}`}>
				<div className={`${baseClassName}__header`}>
					<span className={`${baseClassName}__header-user`}>
						{this.state.post.user_id ? (
							<NavLink to={`/user/${this.state.post.user_id}`}>
								<b>{this.state.post.user_id}</b>
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
				{this.state.post.content_type === 'html' ? (
					<div
						className={`${baseClassName}__body`}
						dangerouslySetInnerHTML={{
							__html: this.state.post.content
						}}
					/>
				) : (
					<img
						className={`${baseClassName}__body`}
						src={`${BACKEND_URL}/img/${this.state.post.content}`}
						alt={'TODO'}
					></img>
				)}

				<div className={`${baseClassName}__buttons`}>
					<div className={`${baseClassName}__buttons-left`}>
						<Button
							size={'nice-rectangle'}
							className={getClassNames({
								'pb-button--liked': this.state.post.reacted
							})}
							label={this.state.post.reaction_count.toString()}
							icon={`favorite${
								this.state.post.reacted ? '' : '_border'
							}`}
							onClick={this.toggleLiked}
							disabled={!this.props.isLoggedIn}
							toolTipEnabled={'Like/react/whatever'}
							toolTipDisabled={
								'You must be logged in to react to posts'
							}
						/>
						<Button
							size={'nice-rectangle'}
							icon={'chat_bubble_outline'}
							label={this.state.post.child_count.toString()}
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
					</div>
				</div>
				{this.state.showComments && (
					<CommentList
						postID={this.state.post.entity_id}
						onUpdate={() => {}}
						//onUpdate={this.updateCommentList}
					/>
				)}
			</div>
		) : (
			<p>Loading... TODO </p> // TODO
		);
	}
}
const mapStateToProps = (state: ReducerStateType) => ({
	isLoggedIn: isLoggedIn(state)
});

export default connect(mapStateToProps)(Post);
