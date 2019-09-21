import React from 'react';

import './CommunityBar.scss';
import Dropdown from '../../controls/Dropdown/Dropdown';
import Button from '../../controls/Button/Button';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { ReducerStateType } from '../../entities/reducer';
import { isLoggedIn } from '../../entities/selectors';
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

				<Button
					label={'Follow'}
					disabled={!this.props.isLoggedIn}
					toolTipDisabled={
						'You must be logged in to follow communities'
					}
				/>

				<span>Sort posts by: </span>
				<Dropdown
					defaultOption={1} // by ID!
					type={'select'}
					options={[
						{ label: 'New', onClick: () => {} },
						{ label: 'Top', onClick: () => {} }
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
