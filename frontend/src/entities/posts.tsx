import { toast } from 'react-toastify';
import { BACKEND_URL } from '../Config';

import { ACTION_SET_POSTS, ACTION_SET_COMMENTS_FOR_POST_ID } from './actions';

import store from './store';

const displayErrorNotification = (title: string, message: string) => {
	toast.error(`${title} - ${message}`, {
		autoClose: 3000,
		hideProgressBar: true,
		closeButton: false
	});
};

export const fetchPosts = (callbackNotifyLoading: (arg0: boolean) => void) => {
	const fetchParams = { method: 'GET' };
	fetch(`${BACKEND_URL}/posts`, fetchParams)
		.then(response => {
			if (response.ok) {
				return response.json();
			}
			throw new Error(response.status + ': ' + response.statusText);
		})
		.then(posts => {
			// TODO we should call this from createPost etc as well
			// this is temporary
			if (callbackNotifyLoading) {
				callbackNotifyLoading(false);
			}
			return store.dispatch({ type: ACTION_SET_POSTS, posts: posts });
		})
		.catch(error => {
			if (callbackNotifyLoading) {
				callbackNotifyLoading(false);
			}
			return displayErrorNotification(
				'Failed to load posts',
				error.message
			);
		});
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
		.then(response => fetchPosts())
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
		.then(response => fetchCommentsForPostByID(postID))
		.catch(error => {
			displayErrorNotification('Failed to create comment', error.message);
		});
};

export const fetchCommentsForPostByID = (
	postID: number,
	callbackNotifyLoading
) => {
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
		});
};
