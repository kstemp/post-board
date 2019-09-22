import React from 'react';

import './CommunityBar.scss';
import Dropdown from '../../controls/Dropdown/Dropdown';
import Button from '../../controls/Button/Button';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { ReducerStateType } from '../../entities/reducer';
import { isLoggedIn } from '../../entities/selectors';
import Toggle from '../../controls/Toggle/Toggle';
const baseClassName = 'community-bar';

interface OwnProps {
	communityID: number;
}

interface StateProps {
	isLoggedIn: boolean;
}

type Props = OwnProps & StateProps;

class CommunityBar extends React.Component<Props> {
	render() {
		return (
			<div className={baseClassName}>
				<NavLink to={`/community/${this.props.communityID}/post`}>
					<Button label={'Post'} icon={'edit'} />
				</NavLink>

				<Toggle
					checked
					label={'Follow'}
					disabled={!this.props.isLoggedIn}
				/>
				<span>Sort posts by: </span>
				<Dropdown
					defaultOption={1} // by ID!
					type={'select'}
					options={[
						{
							label: 'New'
						},
						{ label: 'Top' }
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
