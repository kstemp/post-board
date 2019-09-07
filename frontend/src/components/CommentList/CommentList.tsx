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

export interface OwnProps {
	postID: IDType;
}

interface StateProps {
	comments: CommentType[];
}

type Props = OwnProps & StateProps;

interface State {
	isLoadingComments: boolean;
}

class CommentList extends React.Component<Props, State> {
	private commentTextInput: React.RefObject<TextArea>;

	constructor(props: Props) {
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
				<div className={`${baseClassName}__new-comment`}>
					<TextArea
						emptyText={'Comment text goes here'}
						ref={this.commentTextInput}
					/>
					<button onClick={this.createComment}>Send</button>
				</div>
				{this.state.isLoadingComments ? (
					<LoadingSpinner text={'Loading comments...'} />
				) : this.props.comments.length ? (
					this.props.comments.map(comment => (
						<Comment key={comment.id} comment={comment} />
					))
				) : (
					<div>No comments yet.</div>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state: ReducerStateType, ownProps: OwnProps) => {
	return {
		comments: state.comment[ownProps.postID] || [] // TODO is this '||' really a decent solution here?
	};
};

export default connect(mapStateToProps)(CommentList);
