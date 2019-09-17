import React from 'react';

import './Dropdown.scss';
const baseClassName = 'dropdown';

interface OwnProps {
	controller: React.ReactNode;
}

class Dropdown extends React.Component<OwnProps> {
	render() {
		return (
			<div className={baseClassName}>
				{this.props.controller}
				<div className={`${baseClassName}-content`}>
					{this.props.children}
				</div>
			</div>
		);
	}
}

export default Dropdown;
