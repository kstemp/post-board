import React from 'react';

import './CommunityBar.scss';
import Dropdown from '../../controls/Dropdown/Dropdown';
import Button from '../../controls/Button/Button';
const baseClassName = 'community-bar';

class CommunityBar extends React.Component {
	render() {
		return (
			<div className={baseClassName}>
				<Button label={'Post'} icon={'edit'} />
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
