//@flow
import { ACTION_SET_POSTS } from './actions';

const initialState = {
	posts: []
};

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTION_SET_POSTS:
			return {
				...state,
				posts: action.posts
			};
		default:
			return state;
	}
};
