import React from 'react';

import { CommentType } from '../../entities/types';

const baseClassName = 'comment';

type CommentProps = {
	comment: CommentType;
};

class Comment extends React.Component<CommentProps> {
	render() {
		return <div className={baseClassName}>{this.props.comment.text}</div>;
	}
}

export default Comment;
