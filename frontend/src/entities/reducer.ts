import { ACTION_SET_ENTITIES } from './actions';

import { ReducerStateType, SetEntitiesActionDataType } from './types';
import { statement } from '@babel/template';

const initialState = {
	post: [],
	comment: {},
	community: []
};

// TODO fix action type
export const reducer = (
	state: ReducerStateType = initialState,
	action: { type: string; data: SetEntitiesActionDataType }
) => {
	switch (action.type) {
		case ACTION_SET_ENTITIES:
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
		default:
			return state;
	}
};
