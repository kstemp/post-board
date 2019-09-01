//@flow
import React from 'react';

type PostCreatorProps = {};

const baseClassName = 'post-creator';

class PostCreator extends React.Component<PostCreatorProps> {
	render() {
		return (
			<div className={baseClassName}>
				Create a post: <input className={`${baseClassName}__input`} value={"What's on your mind?"} />
			</div>
		);
	}
}

export default PostCreator;
