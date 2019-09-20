import React from 'react';

import './CommunityBar.scss';
import Dropdown from '../../controls/Dropdown/Dropdown';
import Button from '../../controls/Button/Button';
import { Route } from 'react-router';
import { NavLink } from 'react-router-dom';
const baseClassName = 'community-bar';

interface OwnProps {
	communityID: number;
}

class CommunityBar extends React.Component<OwnProps> {
	render() {
		return (
			<div className={baseClassName}>
				<NavLink to={`/community/${this.props.communityID}/post`}>
					<Button label={'Post'} icon={'edit'} />
				</NavLink>

				<Button size={'nice-rectangle'} label={'Follow'} />

				<span>Sort posts by: </span>
				<Dropdown
					options={[
						{ label: 'New', onClick: () => {} },
						{ label: 'Top', onClick: () => {} }
					]}
				/>
			</div>
		);
	}
}

export default CommunityBar;
