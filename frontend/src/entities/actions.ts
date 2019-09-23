export const ACTION_SET_ACCESS_TOKEN = 'ACTION_SET_ACCESS_TOKEN';

interface IActionSetAccessToken {
	type: 'ACTION_SET_ACCESS_TOKEN';
	accessToken: string;
}

export type TAction = IActionSetAccessToken;
