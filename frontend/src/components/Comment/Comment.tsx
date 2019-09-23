import React from 'react';

import { TComment } from '../../entities/types';

import { Link } from 'react-router-dom';

import './Comment.scss';
import { prettyPrintDateDifference } from '../../util/date';

const baseClassName = 'comment';

interface OwnProps {
	comment: TComment;
}

class Comment extends React.Component<OwnProps> {
	render() {
		//console.log(this.props.comment);
		return (
			<div className={baseClassName}>
				<div className={`${baseClassName}__content`}>
					{this.props.comment.login ? (
						<Link to={`/user/${this.props.comment.login}`}>
							<span
								className={`${baseClassName}__content-user-name`}
							>
								{this.props.comment.login}
							</span>
						</Link>
					) : (
						<span className={`${baseClassName}__content-user-name`}>
							Anonymous
						</span>
					)}
					{this.props.comment.text}
				</div>
				<span className={`${baseClassName}-created-on`}>
					{prettyPrintDateDifference(
						new Date(this.props.comment.created_on),
						new Date()
					)}
				</span>
			</div>
		);
	}
}

export default Comment;
