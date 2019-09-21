import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';

import Post from '../Post/Post';
import { IDType } from '../../entities/types';

import { displayErrorNotification } from '../../util/notification';
import { ReducerStateType } from '../../entities/reducer';
import { fetchPostIDsForCommunityID } from '../../entities/fetchers';
import Button from '../../controls/Button/Button';

import './PostList.scss';
const baseClassName = 'post-list';

/*
interface StateProps {
	communityID: IDType;
}*/
//type RouteProps = RouteComponentProps<{ communityID: string }>;

//type Props = /*RouteProps &*/ StateProps;

interface OwnProps {
	communityID: number;
}

interface State {
	postIDs: IDType[];
	currentOffset: number;
}

class PostList extends React.Component<OwnProps, State> {
	constructor(props: OwnProps) {
		super(props);

		this.state = {
			postIDs: [],
			currentOffset: 0
		};
	}

	loadMorePosts = () => {
		fetchPostIDsForCommunityID(
			this.props.communityID,
			this.state.currentOffset
		)
			.then((postIDs: any) =>
				this.setState(state => ({
					postIDs: [...state.postIDs, ...postIDs],
					currentOffset: this.state.currentOffset + 5
				}))
			)
			.catch((errorMessage: string) =>
				displayErrorNotification(
					`Failed to fetch posts - ${errorMessage}`
				)
			);
	};

	componentDidMount() {
		this.loadMorePosts();
	}

	render() {
		//	console.log('in render: ', this.state.postIDs);
		//	console.log('COMM ID is here ', this.props.communityID);
		return (
			<div className={baseClassName}>
				{this.state.postIDs.length
					? this.state.postIDs.map(postID => (
							<Post key={postID} entity_id={postID} />
					  ))
					: 'No posts here.'}
				<Button
					fill
					className={`${baseClassName}-load-more-posts`}
					label={'Load more posts...'}
					onClick={this.loadMorePosts}
				/>
			</div>
		);
	}
}
/*
const mapStateToProps = (state: ReducerStateType/*, props: RouteProps) => ({
	//posts: state.post//,
//	communityID: parseInt(props.match.params.communityID)
});*/

export default /*connect(mapStateToProps)(*/ PostList; //);
