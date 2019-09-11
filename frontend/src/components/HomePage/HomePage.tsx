import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../controls/Button/Button';

import './HomePage.scss';

const baseClassName = 'home-page';

const SAMPLE_COMMUNITIES = ['1', '2'];

class HomePage extends React.Component {
	render() {
		return (
			<div className={baseClassName}>
				<p>Welcome to post-board.</p>
				<p>Sample communities:</p>
				{SAMPLE_COMMUNITIES.map(community => (
					<Link to={`/community/${community}`}>
						<Button fill label={`Community ${community}`} />
					</Link>
				))}
			</div>
		);
	}
}

export default HomePage;
