import React from 'react';

import Button from '../../controls/Button/Button';

import { createPost } from '../../entities/fetchers';

import { displayErrorNotification } from '../../util/notification';

import './PostCreator.scss';
import RichTextEditor from '../../controls/RichTextEditor/RichTextEditor';

const baseClassName = 'post-creator';

interface OwnProps {
	boardID: string;
}

interface State {
	isValid: boolean;
}

class PostCreator extends React.Component<OwnProps, State> {
	refEditor: React.RefObject<RichTextEditor>;
	constructor(props: OwnProps) {
		super(props);

		this.refEditor = React.createRef();

		this.state = {
			isValid: false
		};
	}
	createPost = async () => {
		if (!this.refEditor.current) {
			return;
		}

		const dataHTML = this.refEditor.current.getInnerHTML();
		console.log(dataHTML);
		try {
			await createPost(dataHTML, this.props.boardID);
		} catch (error) {
			displayErrorNotification('Failed to create post', error);
		}
	};

	render() {
		return (
			<div className={baseClassName}>
				<p>
					<b>Create a post: </b>
				</p>
				<RichTextEditor ref={this.refEditor} />

				<Button fill label={'Post'} onClick={this.createPost} />
			</div>
		);
	}
}

export default PostCreator;

/*	<textarea
					placeholder={'Post text goes here'}
					onChange={this.fieldChanged}
					required
				/> */
