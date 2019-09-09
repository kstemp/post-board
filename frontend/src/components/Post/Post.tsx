import React from 'react';

import CommentList from '../CommentList/CommentList';
import Button from '../Button/Button';

import { PostType, CommentType, CommunityType } from '../../entities/types';

import './Post.scss';

const baseClassName = 'post';

interface StateProps {
	post: PostType;
}

interface State {
	comments: CommentType[];
	showComments: boolean;
}

type Props = StateProps;

class Post extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			comments: [],
			showComments: false
		};
	}

	toggleShowComments = () => {
		this.setState({
			showComments: !this.state.showComments
		});
	};

	render() {
		return (
			<div className={`${baseClassName}`}>
				<div className={`${baseClassName}__header`}>
					<span className={`${baseClassName}__header-user`}>
						<b>community name</b>
						<a href='/community/2'>#{this.props.post.id}</a>
					</span>
					<span className={`${baseClassName}__header-time`}>
						posted 420 hours ago
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
