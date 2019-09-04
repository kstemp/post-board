import { BACKEND_URL } from '../Config';

import { ACTION_SET_POSTS } from './actions';

import store from './store';

export const fetchPosts = () => {
	console.log('fetch!');
	fetch(`${BACKEND_URL}/posts`, { method: 'GET' })
		.then(response => {
			if (response.ok) {
				return response.json();
			}

			throw 'TODO';
		})
		.then(posts => {
			return store.dispatch({ type: ACTION_SET_POSTS, posts: posts });
		})
		.catch(error => {});
};
