import React from 'react';

import './CommunityBar.scss';
import Dropdown from '../../controls/Dropdown/Dropdown';
import { connect } from 'react-redux';
import { ReducerStateType } from '../../entities/reducer';
import { isLoggedIn } from '../../entities/selectors';
import { TContentSorting } from '../../entities/types';
const baseClassName = 'community-bar';

interface OwnProps {
	communityID: number;
	notifyContentSortingChanged: (sorting: TContentSorting) => void;
}

interface StateProps {
	isLoggedIn: boolean;
}

type Props = OwnProps & StateProps;

class CommunityBar extends React.Component<Props> {
	render() {
		return (
			<div className={baseClassName}>
				<span>Sort posts by: </span>
				<Dropdown
					defaultOption={0}
					notifyOptionChanged={
						(option: number) =>
							this.props.notifyContentSortingChanged(
								option == 0 ? 'new' : 'top'
							) // TODO map, or sth like that...
					}
					type={'select'}
					options={[
						{
							label: 'New',
							icon: 'flare'
						},
						{ label: 'Top', icon: 'trending_up' }
					]}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state: ReducerStateType) => ({
	isLoggedIn: isLoggedIn(state)
});
export default connect(mapStateToProps)(CommunityBar);
