import React from 'react';

import { TComment } from '../../entities/types';

import './Comment.scss';
import { prettyPrintDateDifference } from '../../util/date';
import Button from '../../controls/Button/Button';
import Input from '../../controls/Input/Input';
import { fetchCommentsForPostIDAndParentCommentID } from '../../entities/fetchers';
import { FetchError } from '../../entities/entity';
import { displayErrorNotification } from '../../util/notification';

const baseClassName = 'comment';

interface OwnProps {
	comment: TComment;
}

interface State {
	comments?: TComment[];
	openReplyInputField: boolean;
}

class Comment extends React.Component<OwnProps, State> {
	constructor(props: OwnProps) {
		super(props);

		this.state = {
			openReplyInputField: false
		};
	}

	openInputFieldAndLoadComments = () => {
		this.setState({
			openReplyInputField: true
		});
		fetchCommentsForPostIDAndParentCommentID(
			this.props.comment.parent_post_id,
			this.props.comment.entity_id
		)
			.then(comments => console.log(comments))
			.catch((error: FetchError) =>
				displayErrorNotification(
					'Failed to fetch child comments',
					error
				)
			);
	};

	render() {
		return (
			<div className={baseClassName}>
				<div className={`${baseClassName}__header`}>
					<span className={`${baseClassName}__header-login`}>
						{this.props.comment.login || 'Anonymous'}
					</span>
					<span className={`${baseClassName}__header-created-on`}>
						{prettyPrintDateDifference(
							new Date(this.props.comment.created_on),
							new Date()
						)}
					</span>
				</div>
				<span className={`${baseClassName}__content`}>
					{this.props.comment.text}
				</span>
				<div className={`${baseClassName}__buttons`}>
					<Button label={'123'} icon={'favorite'} />
					<Button
						icon={'chat_bubble_outline'}
						label={'143'}
						onClick={this.openInputFieldAndLoadComments}
					/>
				</div>
				{this.state.openReplyInputField && (
					<Input placeholder={'Comment text goes here'} required />
				)}
			</div>
		);
	}
}

export default Comment;
