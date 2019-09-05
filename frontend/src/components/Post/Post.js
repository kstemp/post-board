//@flow
import React from 'react';

import Comment from '../Comment/Comment';
import TextArea from '../TextArea/TextArea';

import {
	createCommentForPostByID,
	fetchCommentsForPostByID
} from '../../entities/posts';

import './style/Post.scss';

type PostProps = {};

const baseClassName = 'post';

class Post extends React.Component<PostProps> {
	constructor(props) {
		super(props);

		this.state = {
			comments: []
		};
	}

	createComment = () => {
		createCommentForPostByID(
			this.props.post.id,
			this.commentTextInput.getValue()
		);
	};

	componentDidMount() {
		fetchCommentsForPostByID(this.props.post.id, comments =>
			this.setState({ comments: comments })
		);
	}

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
				{this.state.comments.length ? (
					this.state.comments.map(comment => (
						<Comment key={comment.ID} comment={comment} />
					))
				) : (
					<div>No comments yet.</div>
				)}
				<div className={`${baseClassName}__new-comment`}>
					<TextArea
						emptyText={'Comment text goes here'}
						ref={input => (this.commentTextInput = input)}
					/>
					<button onClick={this.createComment}>Send</button>
				</div>
			</div>
		);
	}
}

export default Post;

/*
	{this.props.post.comments.length ? (
					this.props.post.comments.map(comment => (
						<Comment key={comment.ID} comment={comment} />
					))
				) : (
					<div>No comments yet.</div>
				)}
				<div className={`${baseClassName}__new-comment`}>
					<TextArea
						emptyText={'Comment text goes here'}
				ref={input => (this.commentTextInput = input)}
					/>
					<button onClick={this.createComment}>Send</button>
				</div>
 */
