import React from 'react';

import { CommentType } from '../../entities/types';

import './Comment.scss';
import { Link } from 'react-router-dom';

const baseClassName = 'comment';

type CommentProps = {
	comment: CommentType;
};

class Comment extends React.Component<CommentProps> {
	render() {
		return (
			<div className={baseClassName}>
				<Link to={'/user/123874263'}>
					<span className={`${baseClassName}-user-name`}>
						UserName
					</span>
				</Link>
				{this.props.comment.text}
			</div>
		);
	}
}

export default Comment;
