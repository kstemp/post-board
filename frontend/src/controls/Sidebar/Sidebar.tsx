import React from 'react';

import './Sidebar.scss';
const baseClassName = 'sidebar';

class Sidebar extends React.Component {
	render() {
		return (
			<div className={baseClassName}>
				<span>My communities:</span>

				<ul>
					<li>Community 1</li>
					<li>Community 2</li>
				</ul>
			</div>
		);
	}
}

export default Sidebar;
