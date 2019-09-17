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
					options={[
						{
							onClick: () => console.log('1'),
							buttonProps: {
								icon: 'edit',
								label: 'Edit'
							}
						},
						{
							onClick: () => console.log('2'),
							buttonProps: {
								icon: 'delete',
								label: 'Delete'
							}
						},
						{
							onClick: () => console.log('3'),
							buttonProps: {
								icon: 'report',
								label: 'Report'
							}
						}
					]}
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
