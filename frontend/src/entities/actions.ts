import {
	EntityTypeEnum,
	IDType,
	CommunityType,
	CommentType,
	PostType
} from './types';

export const ACTION_SET_ENTITIES = 'ACTION_SET_ENTITIES';
export const ACTION_SET_ACCESS_TOKEN = 'ACTION_SET_ACCESS_TOKEN';

interface TActionSetEntities {
	type: 'ACTION_SET_ENTITIES';
	data: {
		entityType: EntityTypeEnum;
		parentID?: IDType;
		entities: CommunityType | PostType | CommentType;
	};
}

interface TActionSetAccessToken {
	type: 'ACTION_SET_ACCESS_TOKEN';
	accessToken: string;
}

export type TAction = TActionSetEntities | TActionSetAccessToken;
