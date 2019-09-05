//@flow
import React from 'react';
import { connect } from 'react-redux';

import Post from '../Post/Post';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

import { fetchPosts } from '../../entities/posts';

import './style/PostList.scss';

const baseClassName = 'post-list';

type PostListProps = {};

class PostList extends React.Component<PostListProps> {
	constructor(props) {
		super(props);

		this.state = {
			isLoadingPosts: false
		};
	}

	setIsLoadingPosts = () =>
		this.setState({
			isLoadingPosts: !this.state.isLoadingPosts
		});

	componentDidMount() {
		this.setIsLoadingPosts(true);
		fetchPosts(this.setIsLoadingPosts);
	}

	render() {
		console.log('in props', this.props.posts);
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
