import React from 'react';
import { TContentSorting, IBoard, TEntity } from '../../entities/types';

import './BoardRenderer.scss';
import {
	fetchBoardMetadata,
	fetchPostsForBoardID
} from '../../entities/fetchers';
import { displayErrorNotification } from '../../util/notification';
import Button from '../../controls/Button/Button';
import PostCreator from '../PostCreator/PostCreator';
import { FetchError } from '../../entities/entity';
import EntityRenderer from '../EntityRenderer/EntityRenderer';

const baseClassName = 'community-renderer';
const POST_INCREMENT = 5;

interface OwnProps {
	boardID: string;
}

interface State {
	failedToLoadMetadata: boolean;
	posts: TEntity[];
	currentOffset: number;
	contentSorting: TContentSorting;

	metadata?: IBoard;
}

class BoardRenderer extends React.Component<OwnProps, State> {
	constructor(props: OwnProps) {
		super(props);

		this.state = {
			failedToLoadMetadata: false,
			posts: [],
			currentOffset: 0,
			contentSorting: 'new'
		};
	}

	reset = () => {
		this.setState({
			posts: [],
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
		fetchPostsForBoardID(
			this.props.boardID,
			this.state.currentOffset,
			'new'
		)
			.then(posts =>
				this.setState(state => ({
					posts: [...state.posts, ...posts],
					currentOffset: this.state.currentOffset + POST_INCREMENT
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
						<div className={'page-content'}>
							<div className={`${baseClassName}__posts`}>
								<PostCreator boardID={this.props.boardID} />
								{this.state.posts.length
									? this.state.posts.map(post => (
											<EntityRenderer
												baseClassName={'post'}
												key={post.entity_id}
												//entity_id={postID}
												entity={post}
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
						</div>
					</>
				)}
			</div>
		);
	}
}

export default BoardRenderer;
