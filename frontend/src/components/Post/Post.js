//@flow
import React from 'react';

type PostProps = {};

const baseClassName = 'post';

class Post extends React.Component<PostProps> {
	render() {
		return <div className={`${baseClassName}`}>{this.props.text}</div>;
	}
}

export default Post;
