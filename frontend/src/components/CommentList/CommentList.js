//@flow
import React from 'react';

const baseClassName = 'comment-list';

type CommentListProps = {
	comments: Comment[]
};

class CommentList extends React.Component<CommentListProps> {
	// TODO don't wrap every level in another div...
	renderCommentsForParentID = parentID => {
		return (
			<div>
				{this.props.comments
					.filter(comment => comment.parentID === parentID)
					.map(comment => (
						<div style={{ 'padding-left': 20 }}>
							<p>{comment.text}</p>
							{this.renderCommentsForParentID(comment.ID)}
						</div>
					))}
			</div>
		);
	};
	render() {
		return <div className={baseClassName}>{this.renderCommentsForParentID(null)}</div>;
	}
}

export default CommentList;
