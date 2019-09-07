import React from 'react';

import TextArea from '../TextArea/TextArea';

import { createPost } from '../../entities/posts';

import './PostCreator.scss';

type PostCreatorProps = {};
type PostCreatorStateProps = {
	isInCreationMode: boolean;
	isValid: boolean;
};

const baseClassName = 'post-creator';

class PostCreator extends React.Component<
	PostCreatorProps,
	PostCreatorStateProps
> {
	private postTextField: React.RefObject<TextArea>;

	constructor(props: PostCreatorProps) {
		super(props);

		this.postTextField = React.createRef();

		this.state = {
			isInCreationMode: false,
			isValid: true
		};
	}

	componentDidMount() {
		this.fieldChanged(false); // TODO this is to update validity initially, figure out a better method
	}

	createPost = () => {
		createPost((this.postTextField.current as any).getValue()); // TODO get rid of as any...
	};

	fieldChanged = (isValid: boolean) => {
		this.setState({
			isValid: isValid
		});
	};

	render() {
		return (
			<div className={baseClassName}>
				<p>Create a post: </p>
				<TextArea
					isMultiLine={true}
					className={`${baseClassName}__input-field`}
					ref={this.postTextField}
					emptyText={'Post text goes here...'}
					onChange={this.fieldChanged}
					required
				/>
				<p>Hint: tag a previous post by using e.g. '#111222'</p>
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
