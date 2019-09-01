//@flow
import React from 'react';

import './style/Post.scss';

type PostProps = {
	text: string
};

const baseClassName = 'post';

class Post extends React.Component<PostProps> {
	render() {
		return <div className={`${baseClassName}`}>{this.props.text}</div>;
	}
}

export default Post;
