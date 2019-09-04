//@flow
import React from 'react';
import { connect } from 'react-redux';

import Post from '../Post/Post';

import { fetchPosts } from '../../entities/posts';

import './style/PostList.scss';

const baseClassName = 'post-list';

type PostListProps = {};

class PostList extends React.Component<PostListProps> {
	componentDidMount() {
		fetchPosts();
	}

	render() {
		return (
			<div className={baseClassName}>
				{this.props.posts.length
					? this.props.posts.map(post => (
							<Post key={post.ID} post={post} />
					  ))
					: 'No posts here.'}
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
