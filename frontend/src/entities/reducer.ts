import { ACTION_SET_ENTITIES, ACTION_SET_ACCESS_TOKEN } from './actions';

import { TAction } from './actions';

import { PostType, CommentType } from './types';

export interface ReducerStateType {
	post: PostType[];
	comment: { [postID: number]: CommentType[] };
	accessToken: string;
}

const initialState = {
	post: [],
	comment: {},
	accessToken: sessionStorage.getItem('accessToken') || ''
};

const reducer = (state: ReducerStateType = initialState, action: TAction) => {
	switch (action.type) {
		case ACTION_SET_ENTITIES: {
			return action.data.parentID
				? {
						...state,
						[action.data.entityType]: {
							...state[action.data.entityType],
							[action.data.parentID]: action.data.entities
						}
				  }
				: {
						...state,
						[action.data.entityType]: action.data.entities
				  };
		}
		case ACTION_SET_ACCESS_TOKEN:
			return {
				...state,
				accessToken: action.accessToken
			};
		default:
			return state;
	}
};

export default reducer;
