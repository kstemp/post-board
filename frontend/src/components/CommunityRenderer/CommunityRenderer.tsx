import React from 'react';
import { IDType } from '../../entities/types';
import CommunityBar from '../CommunityBar/CommunityBar';

import './CommunityRenderer.scss';
import {
	fetchPostIDsForCommunityID,
	fetchCommunityMetadataForCommunityID
} from '../../entities/fetchers';
import { displayErrorNotification } from '../../util/notification';
import Post from '../Post/Post';
import Button from '../../controls/Button/Button';
import PostCreator from '../PostCreator/PostCreator';
import { FetchError } from '../../entities/entity';

const baseClassName = 'community-renderer';

interface OwnProps {
	communityID: IDType;
}

interface State {
	failedToLoadMetadata: boolean;
	communityName: string;
	postIDs: IDType[];
	currentOffset: number;
}

class CommunityRenderer extends React.Component<OwnProps, State> {
	constructor(props: OwnProps) {
		super(props);

		this.state = {
			communityName: '',
			failedToLoadMetadata: false,
			postIDs: [],
			currentOffset: 0
		};
	}

	componentDidMount() {
		fetchCommunityMetadataForCommunityID(this.props.communityID)
			.then(data => {
				this.loadMorePosts();
				return this.setState({
					// TODO we should just get a string, and not an object
					communityName: data.name
				});
			})
			.catch((error: FetchError) => {
				this.setState({
					failedToLoadMetadata: true
				});
				return displayErrorNotification(
					'Failed to fetch community metadata',
					error
				);
			});
	}

	loadMorePosts = () => {
		fetchPostIDsForCommunityID(
			this.props.communityID,
			this.state.currentOffset
		)
			.then(postIDs =>
				this.setState(state => ({
					postIDs: [...state.postIDs, ...postIDs],
					currentOffset: this.state.currentOffset + 5
				}))
			)
			.catch((error: FetchError) =>
				displayErrorNotification('Failed to fetch posts', error)
			);
	};

	render() {
		return (
			<div className={baseClassName}>
				{this.state.failedToLoadMetadata ? (
					<div className={'page-content'}>
						Failed to load community. Check its URL, maybe?
					</div>
				) : (
					<>
						<div className={`${baseClassName}__banner`}>
							<span>{this.state.communityName}</span>
						</div>
						<CommunityBar communityID={this.props.communityID} />

						<div className={'page-content'}>
							<PostCreator communityID={this.props.communityID} />
							{this.state.postIDs.length
								? this.state.postIDs.map(postID => (
										<Post key={postID} entity_id={postID} />
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
				)}
			</div>
		);
	}
}

export default CommunityRenderer;
