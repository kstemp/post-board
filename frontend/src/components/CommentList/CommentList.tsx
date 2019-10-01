import React from 'react';
import Comment from '../Comment/Comment';

import { IDType, TEntity } from '../../entities/types';
import LoadingSpinner from '../../controls/LoadingSpinner/LoadingSpinner';

import { displayErrorNotification } from '../../util/notification';

import './CommentList.scss';
import { FetchError } from '../../entities/entity';
import {
	fetchEntitiesByParentID,
	createCommentForParentID
} from '../../entities/fetchers';
import Input from '../../controls/Input/Input';

const baseClassName = 'comment-list';

interface OwnProps {
	postID: IDType;
	onUpdate: () => void;
}

type Props = OwnProps;

interface State {
	comments?: TEntity[];
}

class CommentList extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {};
	}

	fetchComments = () =>
		fetchEntitiesByParentID(this.props.postID)
			.then(comments => this.setState({ comments: comments }))
			.catch((error: FetchError) =>
				displayErrorNotification('Failed to fetch comments', error)
			);

	componentDidMount() {
		this.fetchComments();
	}

	createComment = (text: string) =>
		createCommentForParentID(this.props.postID, text)
			.then(() => {
				this.props.onUpdate();
				this.fetchComments();
			})
			.catch((error: FetchError) =>
				displayErrorNotification('Failed to create comment', error)
			);

	render() {
		return (
			<div className={baseClassName}>
				{
					<div className={`${baseClassName}__new-comment`}>
						<Input
							className={'pb-input'}
							required
							autoFocus
							placeholder={'Write something...'}
							onInputSubmit={this.createComment}
						/>
					</div>
				}
				{this.state.comments ? (
					this.state.comments.length ? (
						this.state.comments.map(comment => (
							<Comment
								key={comment.entity_id}
								comment={comment}
							/>
						))
					) : (
						<div>No comments yet.</div>
					)
				) : (
					<LoadingSpinner text={'Loading comments...'} />
				)}
			</div>
		);
	}
}

export default CommentList;
