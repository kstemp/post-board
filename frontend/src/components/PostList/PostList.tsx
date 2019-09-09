import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';

import Post from '../Post/Post';
import { PostType, ReducerStateType, IDType } from '../../entities/types';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

import { fetchPostsForCommunityID } from '../../entities/posts';

const baseClassName = 'post-list';

interface StateProps {
	posts: PostType[];
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
		fetchPostsForCommunityID(
			this.props.communityID,
			this.setIsLoadingPosts
		);
	}

	render() {
		console.log('COMM ID is here ', this.props.communityID);
		return (
			<div className={baseClassName}>
				{this.state.isLoadingPosts ? (
					<LoadingSpinner text={'Loading posts...'} />
				) : this.props.posts.length ? (
					this.props.posts.map(post => (
						<Post key={post.id} post={post} />
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
