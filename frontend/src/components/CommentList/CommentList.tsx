import React from 'react';
import { connect } from 'react-redux';
import Button from '../../controls/Button/Button';
import Comment from '../Comment/Comment';

import { IDType, CommentType, ReducerStateType } from '../../entities/types';

import {
	createCommentForPostID,
	fetchCommentsForPostID // TODO use this one
} from '../../entities/posts';

import LoadingSpinner from '../../controls/LoadingSpinner/LoadingSpinner';

import './CommentList.scss';
import Input from '../../controls/Input/Input';

const baseClassName = 'comment-list';

interface OwnProps {
	postID: IDType;
}

interface StateProps {
	comments: CommentType[];
}

type Props = OwnProps & StateProps;

interface State {
	isLoadingComments: boolean;
	isValid: boolean;
}

class CommentList extends React.Component<Props, State> {
	private commentTextInput: React.RefObject<Input>;

	constructor(props: Props) {
		super(props);

		this.commentTextInput = React.createRef();

		this.state = {
			isLoadingComments: false,
			isValid: false
		};
	}

	componentDidMount() {
		fetchCommentsForPostID(this.props.postID, this.setIsLoadingComments);
	}

	setIsLoadingComments = (isLoadingComments: boolean = true) => {
		this.setState({
			isLoadingComments: isLoadingComments
		});
	};

	fieldChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({
			isValid: event.target.validity.valid
		});
	};

	createComment = () => {
		createCommentForPostID(
			this.props.postID,
			(this.commentTextInput as any).current.value // TODO this is an ugly hack...
		);
	};

	render() {
		return (
			<div className={baseClassName}>
				{
					<div className={`${baseClassName}__new-comment`}>
						<Input
							required
							placeholder={'Comment text goes here...'}
							ref={this.commentTextInput}
							onChange={this.fieldChanged}
						/>
						<Button
							fill
							label={'Send'}
							onClick={this.createComment}
							disabled={!this.state.isValid}
						/>
					</div>
				}
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
		comments: state.comment[ownProps.postID] || [] // TODO is this '||' really a decent solution here?,
	};
};

export default connect(mapStateToProps)(CommentList);
