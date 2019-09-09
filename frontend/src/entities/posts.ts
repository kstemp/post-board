import { BACKEND_URL } from '../Config';
import { fetchEntityAndPlaceInStore } from './entity';
import { IDType } from './types';
import { displayErrorNotification } from '../util/notification';

export const fetchPostsForCommunityID = (
	communityID: IDType,
	callbackNotifyLoading?: (arg0: boolean) => void
) => {
	fetchEntityAndPlaceInStore(
		`/community/${communityID}`,
		'post',
		callbackNotifyLoading
	);
};

export const fetchCommentsForPostByID = (
	postID: IDType,
	communityID: IDType,
	callbackNotifyLoading: (arg0: boolean) => void
) => {
	fetchEntityAndPlaceInStore(
		`community/${communityID}/posts/${postID.toString()}/comments`,
		'comment',
		callbackNotifyLoading,
		postID
	);
};

export const createPost = (postText: string, communityID: IDType) => {
	const fetchParams = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ text: postText })
	};

	fetch(`${BACKEND_URL}/community/${communityID}`, fetchParams)
		.then(response => {
			if (response.ok) {
				return response;
			}
			throw new Error(response.status + ': ' + response.statusText);
		})
		.then(response => fetchPostsForCommunityID(communityID, () => {})) // TODO COMMUNITY ID
		.catch(error => {
			displayErrorNotification('Failed to create post', error.message);
		});
};

export const createCommentForPostByID = (
	postID: IDType,
	communityID: IDType,
	commentText: string
) => {
	const fetchParams = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ text: commentText })
	};

	fetch(`${BACKEND_URL}/posts/${postID.toString()}/comments`, fetchParams)
		.then(response => {
			if (response.ok) {
				return response;
			}
			throw new Error(response.status + ': ' + response.statusText);
		})
		.then(response => fetchCommentsForPostByID(postID, -2, () => {})) // TODO POST ID
		.catch(error => {
			displayErrorNotification('Failed to create comment', error.message);
		});
};
