import React from 'react';

import { connect } from 'react-redux';

import Dropdown from '../Dropdown/Dropdown';
import { ReducerStateType, CommunityType } from '../../entities/types';

import './style/CommunityList.scss';

const baseClassName = 'community-list';

interface StateProps {
	communities: CommunityType[];
}

type Props = StateProps;

class CommunityList extends React.Component<Props> {
	render() {
		return (
			<div className={baseClassName}>
				<span>Community:</span>
				<Dropdown
					options={this.props.communities.map(community => ({
						id: community.id,
						label: community.name
					}))}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state: ReducerStateType) => {
	return {
		communities: state.community
	};
};

export default connect(mapStateToProps)(CommunityList);
