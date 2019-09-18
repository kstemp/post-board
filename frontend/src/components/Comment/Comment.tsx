import React from 'react';

import { TComment } from '../../entities/types';

import { Link } from 'react-router-dom';

import './Comment.scss';
import DropdownWithUserOptions from '../DropdownWithUserOptions/DropdownWithUserOptions';

const baseClassName = 'comment';

interface OwnProps {
	comment: TComment;
}

class Comment extends React.Component<OwnProps> {
	render() {
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
				<DropdownWithUserOptions
					entityType={'comment'}
					entityID={this.props.comment.entity_id}
				/>
			</div>
		);
	}
}

/*controller={
						<Button
							classNames={{ 'test-button': true }}
							label={'...'}
						/>
					}*/

export default Comment;
