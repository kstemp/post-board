import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';

import Post from '../Post/Post';
import { IDType } from '../../entities/types';

import { displayErrorNotification } from '../../util/notification';
import { ReducerStateType } from '../../entities/reducer';
import { fetchPostIDsForCommunityID } from '../../entities/posts';
import Button from '../../controls/Button/Button';

const baseClassName = 'post-list';

interface StateProps {
	communityID: IDType;
}
type RouteProps = RouteComponentProps<{ communityID: string }>;

type Props = RouteProps & StateProps;

interface State {
	postIDs: IDType[];
	isLoadingPosts: boolean;
}

class PostList extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			postIDs: [],
			isLoadingPosts: false
		};
	}

	setIsLoadingPosts = (isLoadingPosts: boolean = true) =>
		this.setState({
			isLoadingPosts: isLoadingPosts
		});

	componentDidMount() {
		//	this.setIsLoadingPosts(true);

		fetchPostIDsForCommunityID(this.props.communityID)
			.then((postIDs: any) => {
				console.log(postIDs);
				return this.setState({ postIDs: postIDs });
			})
			.catch((errorMessage: string) =>
				//	this.setIsLoadingPosts(false);
				displayErrorNotification(
					`Failed to fetch posts - ${errorMessage}`
				)
			);
	}

	render() {
		//	console.log('COMM ID is here ', this.props.communityID);
		return (
			<div className={baseClassName}>
				{this.state.postIDs.length
					? this.state.postIDs.map(postID => (
							<Post key={postID} entity_id={postID} />
					  ))
					: 'No posts here.'}
				<Button label={'Load more posts...'} />
			</div>
		);
	}
}

const mapStateToProps = (state: ReducerStateType, props: RouteProps) => ({
	posts: state.post,
	communityID: parseInt(props.match.params.communityID)
});

export default withRouter(connect(mapStateToProps)(PostList));
