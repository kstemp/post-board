import { ACTION_SET_ENTITIES } from './actions';

import { ReducerStateType, SetEntitiesActionDataType } from './types';

const initialState = {
	post: [],
	comment: {},
	community_id: -1
};

type ReducerSetEntitesActionType = {
	type: string;
	data: SetEntitiesActionDataType;
};

export const reducer = (
	state: ReducerStateType = initialState,
	action: ReducerSetEntitesActionType
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
