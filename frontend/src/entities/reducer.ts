import { ACTION_SET_ACCESS_TOKEN } from './actions';

import { TAction } from './actions';

export interface ReducerStateType {
	accessToken: string;
}

const initialState = {
	accessToken: sessionStorage.getItem('accessToken') || ''
};

const reducer = (state: ReducerStateType = initialState, action: TAction) => {
	switch (action.type) {
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
