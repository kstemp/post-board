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

const handleResponse = response => {
	if (response.ok) {
		return response.json();
	}

	throw new Error(response.status + ': ' + response.statusText);
};

export const fetchPosts = () => {
	const fetchParams = { method: 'GET' };

	fetch(`${BACKEND_URL}/posts`, fetchParams)
		.then(response => handleResponse(response))
		.then(posts => {
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
		.then(response => handleResponse(response))
		.catch(error => {
			displayErrorNotification('Failed to create post', error.message);
		});
};
