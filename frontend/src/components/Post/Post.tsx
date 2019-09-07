import React from 'react';

import CommentList from '../CommentList/CommentList';
import ReactionPicker from '../ReactionPicker/ReactionPicker';

import { PostType, CommentType } from '../../entities/types';

import './Post.scss';

type PostProps = {
	post: PostType;
};

type PostStateProps = {
	comments: CommentType[];
	showComments: boolean;
	showReactionPicker: boolean;
};

const baseClassName = 'post';

class Post extends React.Component<PostProps, PostStateProps> {
	constructor(props: PostProps) {
		super(props);

		this.state = {
			comments: [],
			showComments: false,
			showReactionPicker: false
		};
	}

	// TODO merge these two into one, like toggleShow(component: string, show: boolean = true)
	toggleShowComments = () => {
		this.setState({
			showComments: !this.state.showComments
		});
	};

	toggleShowReactionPicker = () => {
		this.setState({
			showReactionPicker: !this.state.showReactionPicker
		});
	};

	render() {
		console.log(this.props.post);
		return (
			<div className={`${baseClassName}`}>
				<div className={`${baseClassName}__header`}>
					<span className={`${baseClassName}__header-user`}>
						<b>Community </b>
						<a href='#'>#{this.props.post.id}</a>
					</span>
					<span className={`${baseClassName}__header-time`}>
						posted 7 hours ago
					</span>
				</div>
				<div className={`${baseClassName}__body`}>
					{this.props.post.text}
				</div>
				{this.state.showReactionPicker && (
					<div
						className={`${baseClassName}__reaction-picker-container`}
					>
						<ReactionPicker />
					</div>
				)}
				<div className={`${baseClassName}__buttons`}>
					<button onClick={this.toggleShowReactionPicker}>
						React
					</button>
					<button onClick={this.toggleShowComments}>Comment</button>
					<button>Tag</button>
				</div>
				{this.state.showComments && (
					<CommentList postID={this.props.post.id} />
				)}
			</div>
		);
	}
}

export default Post;
