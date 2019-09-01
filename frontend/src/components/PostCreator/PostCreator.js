//@flow
import React from 'react';

import './style/PostCreator.scss';

type PostCreatorProps = {};
type PostCreatorStateProps = {
	isInCreationMode: boolean
};

const baseClassName = 'post-creator';

class PostCreator extends React.Component<PostCreatorProps, PostCreatorStateProps> {
	constructor(props) {
		super(props);

		this.state = {
			isInCreationMode: false
		};
	}

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
					defaultValue={'Write here'}
					onFocus={this.switchMode}
					onBlur={this.switchMode}
				/>
				<p>Hint: tag a previous post by using e.g. '#111222'</p>
				<p>Hint 2: TODO Markdown, obviously</p>
				<button>Post</button>
			</div>
		);
	}
}

export default PostCreator;
