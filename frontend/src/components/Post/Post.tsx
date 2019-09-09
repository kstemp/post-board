import React from 'react';

import CommentList from '../CommentList/CommentList';
import Button from '../Button/Button';

import { PostType, CommentType, CommunityType } from '../../entities/types';

import './Post.scss';

type PostProps = {
	post: PostType;
};

type PostStateProps = {
	comments: CommentType[];
	showComments: boolean;
};

const baseClassName = 'post';

class Post extends React.Component<PostProps, PostStateProps> {
	constructor(props: PostProps) {
		super(props);

		this.state = {
			comments: [],
			showComments: false
		};
	}

	// TODO merge these two into one, like toggleShow(component: string, show: boolean = true)
	toggleShowComments = () => {
		this.setState({
			showComments: !this.state.showComments
		});
	};

	render() {
		console.log('COMM ID = ', this.props.post.community_id);
		return (
			<div className={`${baseClassName}`}>
				<div className={`${baseClassName}__header`}>
					<span className={`${baseClassName}__header-user`}>
						<b>TEST COMM</b>
						<a href='/community/177772'>#{this.props.post.id}</a>
					</span>
					<span className={`${baseClassName}__header-time`}>
						posted 7 hours ago
					</span>
				</div>
				<div className={`${baseClassName}__body`}>
					{this.props.post.text}
				</div>
				<div className={`${baseClassName}__buttons`}>
					<Button icon={'favorite_border'} label={'React'} />
					<Button
						icon={'chat_bubble_outline'}
						label={'Comment'}
						onClick={this.toggleShowComments}
					/>
					<Button icon={'language'} label={'Tag'} />
				</div>
				{this.state.showComments && (
					<CommentList postID={this.props.post.id} />
				)}
			</div>
		);
	}
}

export default Post;
