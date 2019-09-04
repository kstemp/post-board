//@flow
import React from 'react';

import { connect } from 'react-redux';

import Comment from '../Comment/Comment';
import TextArea from '../TextArea/TextArea';

import { createCommentForPostByID } from '../../entities/posts';

import './style/Post.scss';

type PostProps = {};

const baseClassName = 'post';

class Post extends React.Component<PostProps> {
	createComment = () => {
		createCommentForPostByID(
			this.props.post.ID,
			this.commentTextInput.getValue()
		);
		//	console.log(this.commentTextInput.value);
	};
	render() {
		return (
			<div className={`${baseClassName}`}>
				<div className={`${baseClassName}__header`}>
					<span className={`${baseClassName}__header-user`}>
						Anonymous
					</span>
					<span className={`${baseClassName}__header-time`}>
						posted 7 hours ago
					</span>
				</div>
				<div className={`${baseClassName}__body`}>
					{this.props.post.text}
				</div>
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
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {};
};

export default connect(mapStateToProps)(Post);
