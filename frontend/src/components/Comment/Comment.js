//@flow
import React from 'react';

const baseClassName = 'comment';

class Comment extends React.Component {
	render() {
		return <div className={baseClassName}>{this.props.comment.text}</div>;
	}
}

export default Comment;
