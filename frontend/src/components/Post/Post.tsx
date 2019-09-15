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

const baseClassName = 'post';

interface StateProps {
	post: TPost;
	isLoggedIn: boolean;
}

interface State {
	showComments: boolean;
	liked: boolean;
	numberOfComments: number;
}

type Props = StateProps;

class Post extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			showComments: false,
			liked: false,
			numberOfComments: 0
		};
	}

	fetchMetadata = () =>
		fetchMetadataForPostID(this.props.post.entity_id)
			.then((metadata: any) =>
				this.setState({
					numberOfComments: (metadata as any).commentCount
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
		this.setState({
			liked: !this.state.liked
		});
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
					<Button
						icon={`favorite${this.state.liked ? '' : '_border'}`}
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
					<Button
						icon={'link'}
						toolTipEnabled={'Tag'}
						//	label={'Link'}
					/>
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
