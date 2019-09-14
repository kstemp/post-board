import React from 'react';

import CommentList from '../CommentList/CommentList';
import Button from '../../controls/Button/Button';

import { PostType, CommentType } from '../../entities/types';

import './Post.scss';
import { prettyPrintDateDifference } from '../../util/date';
import { ReducerStateType } from '../../entities/reducer';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

const baseClassName = 'post';

interface StateProps {
	post: PostType;
	isLoggedIn: boolean;
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
		console.log(
			new Date(this.props.post.created_on),
			'    ',
			this.props.post.created_on
		);
		return (
			<div className={`${baseClassName}`}>
				<div className={`${baseClassName}__header`}>
					<span className={`${baseClassName}__header-user`}>
						{this.props.post.login ? (
							<NavLink to={`/user/${this.props.post.login}`}>
								<b>{this.props.post.login}</b>
							</NavLink>
						) : (
							'Anonymous'
						)}
					</span>
					<span className={`${baseClassName}__header-time`}>
						{`${prettyPrintDateDifference(
							new Date(this.props.post.created_on),
							new Date()
						)} ago`}
					</span>
				</div>
				<div className={`${baseClassName}__body`}>
					{this.props.post.text}
				</div>
				<div className={`${baseClassName}__buttons`}>
					<Button
						icon={'favorite_border'}
						label={'React'}
						disabled={!this.props.isLoggedIn}
						tooltip={
							!this.props.isLoggedIn
								? 'You must be logged in to react to posts'
								: undefined
						}
					/>
					<Button
						icon={'chat_bubble_outline'}
						label={'Comment'}
						onClick={this.toggleShowComments}
					/>
					<Button icon={'link'} label={'Link'} />
				</div>
				{this.state.showComments && (
					<CommentList postID={this.props.post.id} />
				)}
			</div>
		);
	}
}

const mapStateToProps = (state: ReducerStateType) => {
	return {
		isLoggedIn: !!state.accessToken
	};
};

export default connect(mapStateToProps)(Post);
