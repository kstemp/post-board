import React from 'react';

import { connect } from 'react-redux';

import Dropdown from '../Dropdown/Dropdown';

const baseClassName = 'community-list';

interface StateProps {
	communities: any[];
}

type Props = StateProps;

class CommunityList extends React.Component<Props> {
	render() {
		const dropdownOptions = this.props.communities.map(
			community => community.name
		);

		return (
			<div className={baseClassName}>
				<span>Community:</span>
				<Dropdown options={dropdownOptions} />
			</div>
		);
	}
}

const mapStateToProps = () => {
	return {
		communities: [
			{
				name: 'Oxlove'
			},
			{ name: 'Oxfess' }
		]
	};
};

export default connect(mapStateToProps)(CommunityList);
