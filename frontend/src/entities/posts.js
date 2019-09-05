//@flow
import { toast } from 'react-toastify';
import { BACKEND_URL } from '../Config';

import { ACTION_SET_POSTS } from './actions';

import store from './store';

const displayErrorNotification = (title: string, message: string) => {
	toast.error(`${title} - ${message}`, {
		autoClose: 3000,
		hideProgressBar: true,
		closeButton: false
	});
};

export const fetchPosts = callbackNotifyLoaded => {
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
			if (callbackNotifyLoaded) {
				callbackNotifyLoaded();
			}
			return store.dispatch({ type: ACTION_SET_POSTS, posts: posts });
		})
		.catch(error =>
			displayErrorNotification('Failed to load posts', error.message)
		);
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
	postID: string,
	commentText: string
) => {
	const fetchParams = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ text: commentText })
	};

	fetch(`${BACKEND_URL}/posts/${postID}/comments`, fetchParams)
		.then(response => {
			if (response.ok) {
				return response;
			}
			throw new Error(response.status + ': ' + response.statusText);
		})
		.then(response => fetchPosts())
		.catch(error => {
			displayErrorNotification('Failed to create comment', error.message);
		});
};
