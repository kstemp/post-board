import { BACKEND_URL } from '../Config';
import { fetchEntityAndPlaceInStore } from './entity';
import { displayErrorNotification } from '../util/notification';

import { ACTION_SET_ENTITIES } from './actions';

import store from './store';

export const fetchPosts = (callbackNotifyLoading: (arg0: boolean) => void) => {
	fetchEntityAndPlaceInStore('posts', 'post', 'posts', callbackNotifyLoading);
	//return store.dispatch({ type: ACTION_SET_POSTS, posts: posts });
};

export const createPost = (postText: string) => {
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
		.then(response => fetchPosts(() => {}))
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

	/*
	const fetchParams = {
		method: 'GET'
	};
	fetch(`${BACKEND_URL}/posts/${postID.toString()}/comments`)
		.then(response => {
			if (response.ok) {
				return response.json();
			}
			throw new Error(response.status + ': ' + response.statusText);
		})
		.then(comments => {
			if (callbackNotifyLoading) {
				callbackNotifyLoading(false);
			}
			return store.dispatch({
				type: ACTION_SET_COMMENTS_FOR_POST_ID,
				postID: postID,
				comments: comments
			});
		})
		.catch(error => {
			if (callbackNotifyLoading) {
				callbackNotifyLoading(false);
			}
			return displayErrorNotification(
				'Failed to fetch comments',
				error.message
			);
		});*/
};
