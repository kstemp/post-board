//@flow
import React from 'react';

import { connect } from 'react-redux';

import CommentList from '../CommentList/CommentList';

import './style/Post.scss';

type PostProps = {};

const baseClassName = 'post';

class Post extends React.Component<PostProps> {
	render() {
		return (
			<div className={`${baseClassName}`}>
				<div className={`${baseClassName}__header`}>
					<p className={`${baseClassName}__header-title`}>Post</p>
					<p className={`${baseClassName}__header-date`}>posted 7 hours ago</p>
				</div>
				<div className={`${baseClassName}__body`}>{this.props.post.text}</div>
				<div className={`${baseClassName}__buttons-wrapper`}>
					<button>UV</button>
					<button>DV</button>
				</div>
				<CommentList comments={this.props.post.comments} />
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {};
};

export default connect(mapStateToProps)(Post);
