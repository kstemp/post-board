import React from 'react';
import { IDType } from '../../entities/types';
import CommunityBar from '../CommunityBar/CommunityBar';

import './CommunityRenderer.scss';
import {
	fetchCommunityNameForCommunityID,
	fetchPostIDsForCommunityID
} from '../../entities/fetchers';
import { displayErrorNotification } from '../../util/notification';
import Post from '../Post/Post';
import Button from '../../controls/Button/Button';

const baseClassName = 'community-renderer';

interface OwnProps {
	communityID: IDType;
}

interface State {
	stage: 'loading' | 'loaded' | 'not-found';
	communityName: string;
	postIDs: IDType[];
	currentOffset: number;
}

class CommunityRenderer extends React.Component<OwnProps, State> {
	constructor(props: OwnProps) {
		super(props);

		this.state = {
			communityName: '',
			stage: 'loading',
			postIDs: [],
			currentOffset: 0
		};
	}

	componentDidMount() {
		fetchCommunityNameForCommunityID(this.props.communityID)
			.then((response: any) => {
				this.loadMorePosts();
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

	loadMorePosts = () => {
		fetchPostIDsForCommunityID(
			this.props.communityID,
			this.state.currentOffset
		)
			.then((postIDs: any) =>
				this.setState(state => ({
					postIDs: [...state.postIDs, ...postIDs],
					currentOffset: this.state.currentOffset + 5
				}))
			)
			.catch((errorMessage: string) =>
				displayErrorNotification(
					`Failed to fetch posts - ${errorMessage}`
				)
			);
	};

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
								{this.state.postIDs.length
									? this.state.postIDs.map(postID => (
											<Post
												key={postID}
												entity_id={postID}
											/>
									  ))
									: 'No posts here.'}
								<Button
									fill
									className={`${baseClassName}-load-more-posts`}
									label={'Load more posts...'}
									onClick={this.loadMorePosts}
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
