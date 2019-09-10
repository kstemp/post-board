import { ACTION_SET_ENTITIES, ACTION_SET_KEYCLOAK } from './actions';

import { TAction } from './actions';

import { ReducerStateType } from './types';

const initialState = {
	post: [],
	comment: {},
	keycloak: null
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
		case ACTION_SET_KEYCLOAK:
			return {
				...state,
				keycloak: action.keycloak
			};
		default:
			return state;
	}
};

export default reducer;
