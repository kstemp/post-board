import React from 'react';

import Button from '../../../controls/Button/Button';
import { IDType, IUser, TUserProfile } from '../../../entities/types';
import { fetchUserProfile } from '../../../entities/fetchers';
import { displayErrorNotification } from '../../../util/notification';

import './UserPage.scss';
const baseClassName = 'user-page';

interface OwnProps {
	userID: IDType;
}

interface State {
	dummy: boolean;
	profile?: TUserProfile;
}

class UserPage extends React.Component<OwnProps, State> {
	constructor(props: OwnProps) {
		super(props);

		this.state = { dummy: true };
	}

	fetchUserProfile = async () => {
		try {
			this.setState({
				profile: await fetchUserProfile(this.props.userID)
			});
		} catch (e) {
			return displayErrorNotification("Failed to load user's profile", e);
		}
	};
	componentDidMount() {
		this.fetchUserProfile();
	}

	render() {
		return (
			<div className={baseClassName}>
				{this.state.profile ? (
					<React.Fragment>
						<img alt={'User'}></img>
						<p className={`${baseClassName}__name`}>
							{this.state.profile.name}
						</p>
						<p className={`${baseClassName}_buttons`}>
							<Button label={'Follow'} />
							<Button label={'test'} />
							<Button label={'Third b'} />
						</p>
						<p className={`${baseClassName}__bio`}>
							{this.state.profile.bio}
						</p>
					</React.Fragment>
				) : (
					<p>Loading or failed.</p>
				)}
			</div>
		);
	}
}

export default UserPage;
