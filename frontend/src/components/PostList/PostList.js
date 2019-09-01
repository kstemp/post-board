//@flow
import React from 'react';

import './style/PostList.scss';
import Post from '../Post/Post';

import { connect } from 'react-redux';

const baseClassName = 'post-list';

class PostList extends React.Component {
	render() {
		return (
			<div className={baseClassName}>
				{this.props.posts.map(post => (
					<Post post={post} />
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
