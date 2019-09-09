import React from 'react';
import { connect } from 'react-redux';
import Button from '../Button/Button';
import Comment from '../Comment/Comment';
import TextArea from '../TextArea/TextArea';

import { IDType, CommentType, ReducerStateType } from '../../entities/types';

import {
	createCommentForPostByID,
	fetchCommentsForPostByID
} from '../../entities/posts';

import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

import './CommentList.scss';
import { fetchEntityAndPlaceInStore } from '../../entities/entity';

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
		/*fetchEntityAndPlaceInStore(
			`${this.props.location.pathname}/${this.props.postID}/comments`,
			'comment',
			this.setIsLoadingComments,
			this.props.postID
		);*/
		//	this.setIsLoadingComments();
		//	fetchCommentsForPostByID(
		//		this.props.postID,
		//		-69,
		//		this.setIsLoadingComments
		//	); // TODO communityID
	}

	setIsLoadingComments = (isLoadingComments: boolean = true) => {
		this.setState({
			isLoadingComments: isLoadingComments
		});
	};

	createComment = () => {
		createCommentForPostByID(
			this.props.postID,
			-68,
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
					<Button label={'Send'} onClick={this.createComment} />
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

//export default connect(mapStateToProps)(withRouter(CommentList));
export default connect(mapStateToProps)(CommentList);
