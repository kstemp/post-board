import React from 'react';
import { NavLink } from 'react-router-dom';
import Button from '../../../controls/Button/Button';

import './HomePage.scss';
import CommunityBar from '../../CommunityBar/CommunityBar';

const baseClassName = 'home-page';

const SAMPLE_COMMUNITIES = ['1', '2'];

class HomePage extends React.Component {
	render() {
		return (
			<div className={baseClassName}>
				<CommunityBar communityID={1} />
				<p>Welcome to post-board.</p>
				<p>Sample communities:</p>
				{SAMPLE_COMMUNITIES.map(community => (
					<NavLink to={`/community/${community}`}>
						<Button fill label={`Community ${community}`} />
					</NavLink>
				))}
			</div>
		);
	}
}

export default HomePage;
