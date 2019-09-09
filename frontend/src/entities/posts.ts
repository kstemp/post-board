import { fetchEntityAndPlaceInStore, createEntity } from './entity';
import { IDType } from './types';

export const fetchPostsForCommunityID = (
	communityID: IDType,
	callbackNotifyLoading?: (arg0: boolean) => void
) =>
	fetchEntityAndPlaceInStore(
		`/community/${communityID}`,
		'post',
		callbackNotifyLoading
	);

export const fetchCommentsForPostID = (
	postID: IDType,
	callbackNotifyLoading: (arg0: boolean) => void
) =>
	fetchEntityAndPlaceInStore(
		`/post/${postID}/comments`,
		'comment',
		callbackNotifyLoading,
		postID
	);

export const createPost = (postText: string, communityID: IDType) =>
	createEntity(`/community/${communityID}`, postText);

/*
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
};*/

export const createCommentForPostID = (postID: IDType, commentText: string) =>
	createEntity(`/post/${postID}/comments`, commentText);
