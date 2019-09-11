import React from 'react';

import { CommentType } from '../../entities/types';

import './Comment.scss';
import { Link } from 'react-router-dom';
import Button from '../../controls/Button/Button';

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
				<span className={`${baseClassName}-text`}>
					{this.props.comment.text}
				</span>
			</div>
		);
	}
}

export default Comment;
