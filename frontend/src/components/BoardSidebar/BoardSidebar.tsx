import React from 'react';
import './BoardSidebar.scss';
import { IBoard } from '../../entities/types';
const baseClassName = 'board-sidebar';

interface OwnProps {
	metadata: IBoard;
}

class BoardSidebar extends React.Component<OwnProps> {
	render() {
		return (
			<div className={baseClassName}>
				<div className={`${baseClassName}__header`}>Board details</div>
				<div className={`${baseClassName}__content`}>
					<p>
						Subscribed users: {this.props.metadata.subscribed_users}
					</p>
					<p>Created on: {this.props.metadata.created_on}</p>
					<br />
					<p>{this.props.metadata.description}</p>
				</div>
			</div>
		);
	}
}

export default BoardSidebar;
