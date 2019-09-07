import React from 'react';
import { connect } from 'react-redux';

import Post from '../Post/Post';
import { PostType, ReducerStateType } from '../../entities/types';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

import { fetchPosts } from '../../entities/posts';

import './PostList.scss';

const baseClassName = 'post-list';

interface StateProps {
	posts: PostType[];
}

interface State {
	isLoadingPosts: boolean;
}

type Props = StateProps;

class PostList extends React.Component<StateProps, State> {
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

const mapStateToProps = (state: ReducerStateType) => {
	return {
		posts: state.post
	};
};

export default connect(mapStateToProps)(PostList);
