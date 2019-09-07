import {
	ACTION_SET_POSTS,
	ACTION_SET_COMMENTS_FOR_POST_ID,
	ACTION_SET_COMMUNITIES
} from './actions';

import { ReducerStateType } from './types';

const initialState = {
	posts: [],
	comments: {},
	communities: []
};

// TODO fix action type
export const reducer = (
	state: ReducerStateType = initialState,
	action: any
) => {
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
		case ACTION_SET_COMMUNITIES:
			return {
				...state,
				communities: action.communities
			};
		default:
			return state;
	}
};
