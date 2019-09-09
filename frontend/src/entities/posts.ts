import { BACKEND_URL } from '../Config';
import { fetchEntityAndPlaceInStore } from './entity';
import { IDType } from './types';
import { displayErrorNotification } from '../util/notification';

export const fetchPostsForCommunityID = (
	callbackNotifyLoading: (arg0: boolean) => void,
	communityID: IDType
) => {
	fetchEntityAndPlaceInStore(
		`community/${communityID}/posts`,
		'post',
		'posts',
		callbackNotifyLoading
	);
};

export const createPost = (postText: string, communityID?: IDType) => {
	const fetchParams = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ text: postText })
	};

	fetch(`${BACKEND_URL}/posts`, fetchParams)
		.then(response => {
			if (response.ok) {
				return response;
			}
			throw new Error(response.status + ': ' + response.statusText);
		})
		.then(response => fetchPostsForCommunityID(() => {}, -1)) // TODO COMMUNITY ID
		.catch(error => {
			displayErrorNotification('Failed to create post', error.message);
		});
};

export const createCommentForPostByID = (
	postID: number,
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
		.then(response => fetchCommentsForPostByID(postID, () => {}))
		.catch(error => {
			displayErrorNotification('Failed to create comment', error.message);
		});
};

export const fetchCommentsForPostByID = (
	postID: number,
	callbackNotifyLoading: (arg0: boolean) => void
) => {
	fetchEntityAndPlaceInStore(
		`posts/${postID.toString()}/comments`,
		'comment',
		'comments',
		callbackNotifyLoading,
		postID
	);
};
