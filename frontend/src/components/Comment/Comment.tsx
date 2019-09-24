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
		return (
			<div className={baseClassName}>
				<div className={`${baseClassName}__header`}>
					<span className={`${baseClassName}__header-login`}>
						{this.props.comment.login || 'Anonymous'}
					</span>
					<span className={`${baseClassName}__header-created-on`}>
						{prettyPrintDateDifference(
							new Date(this.props.comment.created_on),
							new Date()
						)}
					</span>
				</div>
				<span className={`${baseClassName}__content`}>
					{this.props.comment.text}
				</span>
			</div>
		);
	}
}

export default Comment;
