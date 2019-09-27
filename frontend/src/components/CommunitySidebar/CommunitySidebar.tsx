import React from 'react';
import './CommunitySidebar.scss';
const baseClassName = 'community-sidebar';

class CommunitySidebar extends React.Component {
	render() {
		return (
			<div className={baseClassName}>
				<div className={`${baseClassName}__header`}>Board details</div>
				<div className={`${baseClassName}__content`}>
					<p>Subscribed users: 00000</p>
					<p>Created on: 00.00.0000</p>
					<br />
					<p>
						<b>Community description:</b>
					</p>
					<p>
						Description goes here.... blabla lorem ipsum
						sakjdijasidjaisdiasdasdadsadasd
					</p>
				</div>
			</div>
		);
	}
}

export default CommunitySidebar;
