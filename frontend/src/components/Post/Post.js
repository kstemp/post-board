//@flow
import React from 'react';

import CommentList from '../CommentList/CommentList';

import type { PostType, CommentType } from '../../entities/types';

import './style/Post.scss';

type PostProps = {
	post: PostType
};

type PostStateProps = {
	comments: CommentType[],
	showComments: boolean
};

const baseClassName = 'post';

class Post extends React.Component<PostProps, PostStateProps> {
	constructor(props: PostProps) {
		super(props);

		this.state = {
			comments: [],
			showComments: false
		};
	}

	toggleShowComments = () => {
		this.setState({
			showComments: !this.state.showComments
		});
	};

	render() {
		console.log(this.props.post);
		return (
			<div className={`${baseClassName}`}>
				<div className={`${baseClassName}__header`}>
					<span className={`${baseClassName}__header-user`}>
						<a href='#'>#{this.props.post.id}</a>
					</span>
					<span className={`${baseClassName}__header-time`}>
						posted 7 hours ago
					</span>
				</div>
				<div className={`${baseClassName}__body`}>
					{this.props.post.text}
				</div>
				<div className={`${baseClassName}__buttons`}>
					<button>React</button>
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
