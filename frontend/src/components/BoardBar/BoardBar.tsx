import React from 'react';

import './BoardBar.scss';
import Dropdown from '../../controls/Dropdown/Dropdown';
import { connect } from 'react-redux';
import { ReducerStateType } from '../../entities/reducer';
import { isLoggedIn } from '../../entities/selectors';
import { TContentSorting } from '../../entities/types';
import Button from '../../controls/Button/Button';

const baseClassName = 'board-bar';

interface OwnProps {
	communityID: number;
	notifyContentSortingChanged: (sorting: TContentSorting) => void;
}

interface StateProps {
	isLoggedIn: boolean;
}

type Props = OwnProps & StateProps;

class BoardBar extends React.Component<Props> {
	render() {
		return (
			<div className={baseClassName}>
				{this.props.isLoggedIn && <Button label={'Follow'} />}
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
export default connect(mapStateToProps)(BoardBar);
