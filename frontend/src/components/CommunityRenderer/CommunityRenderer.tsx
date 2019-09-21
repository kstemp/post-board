import React from 'react';
import { IDType } from '../../entities/types';
import CommunityBar from '../CommunityBar/CommunityBar';
import PostList from '../PostList/PostList';

import './CommunityRenderer.scss';
import { fetchCommunityNameForCommunityID } from '../../entities/fetchers';
import { displayErrorNotification } from '../../util/notification';

const baseClassName = 'community-renderer';

interface OwnProps {
	communityID: IDType;
}

interface State {
	stage: 'loading' | 'loaded' | 'not-found';
	communityName: string;
}

class CommunityRenderer extends React.Component<OwnProps, State> {
	constructor(props: OwnProps) {
		super(props);

		this.state = {
			communityName: '',
			stage: 'loading'
		};
	}

	componentDidMount() {
		fetchCommunityNameForCommunityID(this.props.communityID)
			.then((response: any) => {
				return this.setState({
					// TODO we should just get a string, and not an object
					communityName: response.name,
					stage: 'loaded'
				});
			})
			.catch(err => {
				console.log(err);
				if (err.status === 404) {
					return this.setState({
						stage: 'not-found'
					});
				}
				return displayErrorNotification(err);
			});
	}

	render() {
		return (
			<div className={baseClassName}>
				{this.state.stage !== 'loading' &&
					(this.state.stage === 'loaded' ? (
						<>
							<div className={`${baseClassName}__banner`}>
								<span>{this.state.communityName}</span>
							</div>
							<CommunityBar
								communityID={this.props.communityID}
							/>
							<div className={'page-content'}>
								<PostList
									communityID={this.props.communityID}
								/>
							</div>
						</>
					) : (
						<div>Not found.</div>
					))}
			</div>
		);
	}
}

export default CommunityRenderer;
