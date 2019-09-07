import store from './store';
import { ACTION_SET_COMMUNITIES } from './actions';
import { BACKEND_URL } from '../Config';

export const fetchCommunities = () => {
	fetch(`${BACKEND_URL}/communities`, { method: 'GET' })
		.then(response => {
			return response.json();
		})
		.then(communities => {
			store.dispatch({
				type: ACTION_SET_COMMUNITIES,
				communities: communities
			});
		})
		.catch(error => {});
};
