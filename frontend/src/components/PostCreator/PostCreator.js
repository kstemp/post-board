//@flow
import React from 'react';

import TextArea from '../TextArea/TextArea';

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

	componentDidMount() {
		this.fieldChanged(); // to update validity
	}

	createPost = () => {
		createPost(this.postTextField.getValue());
	};

	fieldChanged = () => {
		this.setState({
			isValid: this.postTextField.isValid()
		});
	};

	render() {
		return (
			<div className={baseClassName}>
				<p>Create a post: </p>
				<TextArea
					type={'textarea'}
					className={`${baseClassName}__input-field`}
					ref={postTextField => (this.postTextField = postTextField)}
					emptyText={'Post text goes here...'}
					onChange={this.fieldChanged}
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
