import React from 'react';

import { CommentType } from '../../entities/types';

import './Comment.scss';

const baseClassName = 'comment';

type CommentProps = {
	comment: CommentType;
};

class Comment extends React.Component<CommentProps> {
	render() {
		return (
			<div className={baseClassName}>
				<span className={`${baseClassName}-user-name`}>UserName</span>{' '}
				{this.props.comment.text}
			</div>
		);
	}
}

export default Comment;
