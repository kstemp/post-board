//@flow
import React from 'react';

import './style/Post.scss';

type PostProps = {
	text: string
};

const baseClassName = 'post';

class Post extends React.Component<PostProps> {
	render() {
		return (
			<div className={`${baseClassName}`}>
				<div className={`${baseClassName}__header`}>
					<p className={`${baseClassName}__header-title`}>Post</p>
					<p className={`${baseClassName}__header-date`}>posted 7 hours ago</p>
				</div>
				<div className={`${baseClassName}__body`}>{this.props.text}</div>
				<div className={`${baseClassName}__buttons-wrapper`}>
					<button>UV</button>
					<button>DV</button>
					<button>React</button>
					<button>Comments</button>
					<button>...</button>
				</div>
			</div>
		);
	}
}

export default Post;
