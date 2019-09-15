import React from 'react';

import { TComment } from '../../entities/types';

import { Link } from 'react-router-dom';
import { prettyPrintDateDifference } from '../../util/date';

import './Comment.scss';

const baseClassName = 'comment';

interface OwnProps {
	comment: TComment;
}

class Comment extends React.Component<OwnProps> {
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
