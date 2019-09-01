//@flow
import React from 'react';
import { connect } from 'react-redux';

import Post from '../Post/Post';

import './style/PostList.scss';

const baseClassName = 'post-list';

type PostListProps = {};

class PostList extends React.Component<PostListProps> {
	render() {
		return (
			<div className={baseClassName}>
				{this.props.posts.map(post => (
					<Post key={post.ID} post={post} />
				))}
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
