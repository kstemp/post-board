import { EntityTypeEnum, IDType, TCommunity, TComment, TPost } from './types';

export const ACTION_SET_ENTITIES = 'ACTION_SET_ENTITIES';
export const ACTION_SET_ACCESS_TOKEN = 'ACTION_SET_ACCESS_TOKEN';

interface IActionSetEntities {
	type: 'ACTION_SET_ENTITIES';
	data: {
		entityType: EntityTypeEnum;
		parentID?: IDType;
		entities: TCommunity | TPost | TComment;
	};
}

interface IActionSetAccessToken {
	type: 'ACTION_SET_ACCESS_TOKEN';
	accessToken: string;
}

export type TAction = IActionSetEntities | IActionSetAccessToken;
