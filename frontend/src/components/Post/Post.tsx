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
import { FetchError } from '../../entities/entity';
const baseClassName = 'post';

interface OwnProps {
	entity_id: IDType;
}

interface StateProps {
	isLoggedIn: boolean;
}

interface State {
	showComments: boolean;
	post?: TEntity;
	userData: IUser | null;
}

type Props = OwnProps & StateProps;

class Post extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			showComments: false,
			userData: null
		};
	}

	fetchPost = async () => {
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
	};

	/*etchMetadata = () =>
		fetchMetadataForE(this.props.entity_id)
			.then(metadata =>
				this.setState({
					post: {
						...(this.state.post as any), // TOOD get rid of any
						...metadata
					}
				})
			)
			.catch((error: FetchError) =>
				displayErrorNotification('Failed to load post metadata', error)
			);*/

	componentDidMount() {
		this.fetchPost();
	}

	//updateCommentList = () => this.fetchMetadata();

	toggleShowComments = () =>
		this.setState({
			showComments: !this.state.showComments
		});

	toggleLiked = async () => {
		if (this.state.post) {
			try {
				(await this.state.post.reacted)
					? deleteReactionForEntityID(this.state.post.entity_id)
					: createReactionForEntityID(this.state.post.entity_id);
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
								<b>
									{this.state.userData &&
										this.state.userData.name}
								</b>
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
							//label={this.state.post.child_count.toString()}
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
const mapStateToProps = (state: ReducerStateType) => {
	return {
		isLoggedIn: isLoggedIn(state)
	};
};

export default connect(mapStateToProps)(Post);
