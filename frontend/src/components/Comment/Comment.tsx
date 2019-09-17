import React from 'react';

import { TComment } from '../../entities/types';

import { Link } from 'react-router-dom';
import { prettyPrintDateDifference } from '../../util/date';

import './Comment.scss';
import Button from '../../controls/Button/Button';
import Dropdown from '../../controls/Dropdown/Dropdown';

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
				<Dropdown
					controller={
						<Button
							classNames={{ 'test-button': true }}
							label={'...'}
						/>
					}
				>
					<Button
						//fill
						icon={'edit'}
						//	toolTipEnabled={'More options'}
						label={'Edit'}
					/>
					<Button
						//fill
						icon={'delete'}
						//toolTipEnabled={'More options'}
						label={'Delete'}
					/>
					<Button
						//fill
						icon={'report'}
						//toolTipEnabled={'More options'}
						label={'Report'}
					/>
				</Dropdown>
			</div>
		);
	}
}

export default Comment;
