import React from 'react';
import { connect } from 'react-redux';
import Comment from '../Comment/Comment';
import TextArea from '../TextArea/TextArea';

import { IDType, CommentType, ReducerStateType } from '../../entities/types';

import {
	createCommentForPostByID,
	fetchCommentsForPostByID
} from '../../entities/posts';

import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

import './style/CommentList.scss';

const baseClassName = 'comment-list';

type CommentListProps = {
	postID: IDType;
};

type CommentListInternalProps = {
	comments: CommentType[];
};

type CommentListStateProps = {
	isLoadingComments: boolean;
};

class CommentList extends React.Component<
	CommentListProps & CommentListInternalProps,
	CommentListStateProps
> {
	private commentTextInput: React.RefObject<TextArea>;

	constructor(props: CommentListProps) {
		super(props);

		this.commentTextInput = React.createRef();

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

	createComment = () => {
		createCommentForPostByID(
			this.props.postID,
			(this.commentTextInput as any).current.getValue() // TODO this is an ugly hack...
		);
	};

	render() {
		return (
			<div className={baseClassName}>
				{this.state.isLoadingComments ? (
					<LoadingSpinner text={'Loading comments...'} />
				) : this.props.comments.length ? (
					this.props.comments.map(comment => (
						<Comment key={comment.id} comment={comment} />
					))
				) : (
					<div>No comments yet.</div>
				)}
				<div className={`${baseClassName}__new-comment`}>
					<TextArea
						emptyText={'Comment text goes here'}
						ref={this.commentTextInput}
					/>
					<button onClick={this.createComment}>Send</button>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (
	state: ReducerStateType,
	ownProps: CommentListProps
) => {
	return {
		comments: state.comments[ownProps.postID] || [] // TODO is this '||' really a decent solution here?
	};
};

export default connect(mapStateToProps)(CommentList);
