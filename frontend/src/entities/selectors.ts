import { ReducerStateType } from './reducer';

export const isLoggedIn = (state: ReducerStateType) => !!state.accessToken;
