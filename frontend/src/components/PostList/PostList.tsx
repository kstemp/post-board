import React from 'react';
import { connect } from 'react-redux';

import Post from '../Post/Post';
import { PostType } from '../../entities/types';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

import { fetchPosts } from '../../entities/posts';

import './style/PostList.scss';

const baseClassName = 'post-list';

type PostListProps = {
	posts: PostType[];
};

type PostListStateProps = {
	isLoadingPosts: boolean;
};

class PostList extends React.Component<PostListProps, PostListStateProps> {
	constructor(props) {
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
		fetchPosts(this.setIsLoadingPosts);
	}

	render() {
		return (
			<div className={baseClassName}>
				{this.state.isLoadingPosts ? (
					<LoadingSpinner
						style={{
							'margin-left': 'auto',
							'margin-right': 'auto'
						}}
						text={'Loading posts...'}
					/>
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

const mapStateToProps = state => {
	return {
		posts: state.posts
	};
};

export default connect(mapStateToProps)(PostList);
