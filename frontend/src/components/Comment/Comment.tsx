import React from 'react';

import { TComment } from '../../entities/types';

import './Comment.scss';
import { prettyPrintDateDifference } from '../../util/date';
import Button from '../../controls/Button/Button';
import Input from '../../controls/Input/Input';

const baseClassName = 'comment';

interface OwnProps {
	comment: TComment;
}

interface State {
	openReplyInputField: boolean;
}

class Comment extends React.Component<OwnProps, State> {
	constructor(props: OwnProps) {
		super(props);

		this.state = {
			openReplyInputField: false
		};
	}

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
						label={'Reply'}
						onClick={() => {
							this.setState({
								openReplyInputField: true
							});
						}}
					/>
				</div>
				{this.state.openReplyInputField && (
					<Input placeholder={'Comment text goes here'} />
				)}
			</div>
		);
	}
}

export default Comment;
