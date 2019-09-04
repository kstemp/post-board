//@flow
import React from 'react';

import { createPost } from '../../entities/posts';

import './style/PostCreator.scss';

type PostCreatorProps = {};
type PostCreatorStateProps = {
	isInCreationMode: boolean,
	isValid: boolean
};

const baseClassName = 'post-creator';

class PostCreator extends React.Component<
	PostCreatorProps,
	PostCreatorStateProps
> {
	constructor(props) {
		super(props);

		this.state = {
			isInCreationMode: false,
			isValid: true
		};
	}

	createPost = () => {
		createPost(this.postTextField.value);
	};

	fieldChanged = () => {
		this.setState({
			isValid: this.postTextField.validity.valid
		});
	};

	switchMode = () =>
		this.setState({
			isInCreationMode: !this.state.isInCreationMode
		});

	render() {
		return (
			<div className={baseClassName}>
				<p>Create a post: </p>
				<textarea
					className={`${baseClassName}__input-field ${baseClassName}__input-field--${
						this.state.isInCreationMode ? 'expanded' : 'small'
					}`}
					ref={postTextField => (this.postTextField = postTextField)}
					defaultValue={'Post text goes here'}
					onChange={this.fieldChanged}
					onFocus={this.switchMode}
					onBlur={this.switchMode}
					required
				/>
				<p>Hint: tag a previous post by using e.g. '#111222'</p>
				<p>TODO Markdown, obviously</p>
				<p>TODO Don't allow posts with spaces only</p>
				<button
					disabled={!this.state.isValid}
					onClick={this.createPost}
				>
					Post
				</button>
			</div>
		);
	}
}

export default PostCreator;
