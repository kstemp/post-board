import React from 'react';
import { IDType, TContentSorting, IBoard } from '../../entities/types';
import BoardBar from '../BoardBar/BoardBar';

import './BoardRenderer.scss';
import {
	fetchBoardMetadata,
	fetchPostIDsForBoardID
} from '../../entities/fetchers';
import { displayErrorNotification } from '../../util/notification';
import Post from '../Post/Post';
import Button from '../../controls/Button/Button';
import PostCreator from '../PostCreator/PostCreator';
import { FetchError } from '../../entities/entity';
import BoardSidebar from '../BoardSidebar/BoardSidebar';

const baseClassName = 'community-renderer';

interface OwnProps {
	boardID: string;
}

interface State {
	failedToLoadMetadata: boolean;
	postIDs: IDType[];
	currentOffset: number;
	contentSorting: TContentSorting;

	metadata?: IBoard;
}

class BoardRenderer extends React.Component<OwnProps, State> {
	constructor(props: OwnProps) {
		super(props);

		this.state = {
			failedToLoadMetadata: false,
			postIDs: [],
			currentOffset: 0,
			contentSorting: 'new'
		};
	}

	reset = () => {
		this.setState({
			postIDs: [],
			currentOffset: 0
		});
	};

	componentDidMount() {
		fetchBoardMetadata(this.props.boardID)
			.then(data => {
				this.loadMorePosts();
				return this.setState({
					// TODO we should just get a string, and not an object
					metadata: data
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
		fetchPostIDsForBoardID(
			this.props.boardID,
			this.state.currentOffset,
			'new'
		)
			.then(entityIDList =>
				this.setState(state => ({
					postIDs: [...state.postIDs, ...entityIDList.entity_ids],
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
							<span>
								{this.state.metadata &&
									this.state.metadata.name}
							</span>
						</div>
						<BoardBar
							communityID={1}
							notifyContentSortingChanged={contentSorting =>
								this.setState({
									contentSorting: contentSorting
								})
							}
						/>

						<div className={'page-content'}>
							<div className={`${baseClassName}__posts`}>
								<PostCreator boardID={this.props.boardID} />
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
							{this.state.metadata && (
								<BoardSidebar metadata={this.state.metadata} />
							)}
						</div>
					</>
				)}
			</div>
		);
	}
}

export default BoardRenderer;
