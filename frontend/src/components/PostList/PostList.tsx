import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';

import Post from '../Post/Post';
import { TPost, IDType } from '../../entities/types';
import LoadingSpinner from '../../controls/LoadingSpinner/LoadingSpinner';

import { fetchPostsForCommunityID } from '../../entities/posts';
import { displayErrorNotification } from '../../util/notification';
import { ReducerStateType } from '../../entities/reducer';

const baseClassName = 'post-list';

interface StateProps {
	posts: TPost[];
	communityID: IDType;
}

type RouteProps = RouteComponentProps<{ communityID: string }>;

type Props = RouteProps & StateProps;

interface State {
	isLoadingPosts: boolean;
}

class PostList extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			isLoadingPosts: false
		};
	}

	setIsLoadingPosts = (isLoadingPosts: boolean = true) =>
		this.setState({
			isLoadingPosts: isLoadingPosts
		});

	componentDidMount() {
		this.setIsLoadingPosts(true);
		fetchPostsForCommunityID(this.props.communityID, this.setIsLoadingPosts)
			.then(() => this.setIsLoadingPosts(false))
			.catch((errorMessage: string) => {
				this.setIsLoadingPosts(false);
				displayErrorNotification(
					`Failed to fetch posts - ${errorMessage}`
				);
			});
	}

	render() {
		//	console.log('COMM ID is here ', this.props.communityID);
		return (
			<div className={baseClassName}>
				{this.state.isLoadingPosts ? (
					<LoadingSpinner text={'Loading posts...'} />
				) : this.props.posts.length ? (
					this.props.posts.map(post => (
						<Post key={post.entity_id} post={post} />
					))
				) : (
					'No posts here.'
				)}
			</div>
		);
	}
}

const mapStateToProps = (state: ReducerStateType, props: RouteProps) => ({
	posts: state.post,
	communityID: parseInt(props.match.params.communityID)
});

export default withRouter(connect(mapStateToProps)(PostList));
