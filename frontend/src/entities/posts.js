//@flow
import { toast } from 'react-toastify';
import { BACKEND_URL } from '../Config';

import { ACTION_SET_POSTS } from './actions';

import store from './store';

export const fetchPosts = () => {
	fetch(`http://localhost:8000/posts`, { method: 'GET' })
		.then(response => {
			if (response.ok) {
				return response.json();
			}

			throw new Error(response.status + ': ' + response.statusText);
		})
		.then(posts => {
			return store.dispatch({ type: ACTION_SET_POSTS, posts: posts });
		})
		.catch(error => {
			toast.error('Failed to load posts - ' + error.message, {
				autoClose: 3000,
				hideProgressBar: true,
				closeButton: false
			});
		});
};
