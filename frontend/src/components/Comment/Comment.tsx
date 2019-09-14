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
				{this.props.comment.login ? (
					<Link to={`/user/${this.props.comment.login}`}>
						<span className={`${baseClassName}-user-name`}>
							{this.props.comment.login}
						</span>
					</Link>
				) : (
					<span className={`${baseClassName}-user-name`}>
						Anonymous
					</span>
				)}
				{this.props.comment.text}
			</div>
		);
	}
}

export default Comment;
