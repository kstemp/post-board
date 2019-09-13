import React from 'react';

import './UserPage.scss';
import Button from '../../../controls/Button/Button';
const baseClassName = 'user-page';

class UserPage extends React.Component {
	render() {
		return (
			<div className={baseClassName}>
				<img></img>
				<p className={`${baseClassName}-name-surname`}>Name Surname</p>
				<div className={`${baseClassName}_buttons`}>
					<Button label={'Follow'} />
					<Button label={'test'} />
					<Button label={'Third b'} />
				</div>
				<p className={`${baseClassName}-about-me`}>
					User's own description goes here. Text is justified, and may
					be quite long.
				</p>
			</div>
		);
	}
}

export default UserPage;
