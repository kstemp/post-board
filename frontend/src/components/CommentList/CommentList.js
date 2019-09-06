//@flow
import React from 'react';
import { dispatch, connect } from 'react-redux';
import Comment from '../Comment/Comment';
import TextArea from '../TextArea/TextArea';

import { ACTION_SET_COMMENTS_FOR_POST_ID } from '../../entities/actions';
import { fetchCommentsForPostByID } from '../../entities/posts';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

const baseClassName = 'comment-list';

type CommentListProps = {};

class CommentList extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoadingComments: false
		};
	}

	componentDidMount() {
		this.setIsLoadingComments();
		fetchCommentsForPostByID(this.props.postID, this.setIsLoadingComments);
	}

	setIsLoadingComments = (isLoadingComments: boolean = true) => {
		this.setState({
			isLoadingComments: isLoadingComments
		});
	};

	render() {
		return (
			<div className={baseClassName}>
				{this.state.isLoadingComments ? (
					<LoadingSpinner text={'Loading comments...'} />
				) : this.props.comments.length ? (
					this.props.comments.map(comment => (
						<Comment key={comment.ID} comment={comment} />
					))
				) : (
					<div>No comments yet.</div>
				)}
				<div className={`${baseClassName}__new-comment`}>
					<TextArea
						emptyText={'Comment text goes here'}
						ref={input => (this.commentTextInput = input)}
					/>
					<button onClick={this.createComment}>Send</button>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		comments: state.comments[ownProps.postID] || [] // TODO is this '||' really a decent solution here?
	};
};

export default connect(mapStateToProps)(CommentList);
