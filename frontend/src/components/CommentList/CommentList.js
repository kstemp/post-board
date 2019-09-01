//@flow
import React from 'react';

const baseClassName = 'comment-list';

type CommentListProps = {
	comments: Comment[]
};

class CommentList extends React.Component<CommentListProps> {
	render() {
		return (
			<div className={baseClassName}>
				{this.props.comments ? (
					this.props.comments.filter(comment => !comment.parentID).map(comment => <p>{comment.text}</p>)
				) : (
					<p>Be the first to write a comment.</p>
				)}
			</div>
		);
	}
}

export default CommentList;
