import React from 'react';
import { connect } from 'react-redux';

import Post from '../Post/Post';
import {
	PostType,
	ReducerStateType,
	CommunityType
} from '../../entities/types';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

import { fetchPosts } from '../../entities/posts';

const baseClassName = 'post-list';

interface OwnProps {
	community: CommunityType;
}

interface StateProps {
	posts: PostType[];
}

interface State {
	isLoadingPosts: boolean;
}

type Props = OwnProps & StateProps;

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
		fetchPosts(this.setIsLoadingPosts, this.props.community.id);
	}

	render() {
		console.log('My community is: ', this.props.community.name);

		return (
			<div className={baseClassName}>
				{this.state.isLoadingPosts ? (
					<LoadingSpinner text={'Loading posts...'} />
				) : this.props.posts.length ? (
					this.props.posts.map(post => (
						<Post
							key={post.id}
							post={post}
							community={this.props.community}
						/>
					))
				) : (
					'No posts here.'
				)}
				<button>Load more posts</button>
			</div>
		);
	}
}

const mapStateToProps = (state: ReducerStateType) => {
	return {
		posts: state.post
	};
};

export default connect(mapStateToProps)(PostList);
