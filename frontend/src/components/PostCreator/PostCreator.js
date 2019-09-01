//@flow
import React from 'react';

type PostCreatorProps = {};

const baseClassName = 'post-creator';

class PostCreator extends React.Component<PostCreatorProps> {
	render() {
		return (
			<div className={baseClassName}>
				Create a post: <input className={`${baseClassName}__input`} defaultValue={"What's on your mind?"} />
				<button>Post</button>
			</div>
		);
	}
}

export default PostCreator;
