//@flow
import { ACTION_SET_POSTS, ACTION_SET_COMMENTS_FOR_POST_ID } from './actions';

const initialState = {
	posts: [],
	comments: {}
};

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTION_SET_COMMENTS_FOR_POST_ID:
			return {
				...state,
				comments: {
					...state.comments,
					[action.postID]: action.comments
				}
			};
		case ACTION_SET_POSTS:
			return {
				...state,
				posts: action.posts
			};
		default:
			return state;
	}
};
