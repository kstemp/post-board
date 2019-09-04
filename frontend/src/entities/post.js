import { BACKEND_URL } from '../Config';

export const fetchPosts = () => {
	fetch(`${BACKEND_URL}`, { method: 'GET' })
		.then(response => {
			if (response.ok) {
				return response.json();
			}

			throw 'TODO';
		})
		.then(posts => {
			// TODO
		})
		.catch(error => {});
};
