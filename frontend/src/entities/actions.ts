import {
	EntityTypeEnum,
	IDType,
	CommunityType,
	CommentType,
	PostType,
	TKeycloakData
} from './types';

export const ACTION_SET_ENTITIES = 'ACTION_SET_ENTITIES';
export const ACTION_SET_KEYCLOAK_DATA = 'ACTION_SET_KEYCLOAK_DATA';

interface TActionSetEntities {
	type: 'ACTION_SET_ENTITIES';
	data: {
		entityType: EntityTypeEnum;
		parentID?: IDType;
		entities: CommunityType | PostType | CommentType;
	};
}

interface TActionSetKeycloakData {
	type: 'ACTION_SET_KEYCLOAK_DATA';
	keycloakData: TKeycloakData;
}

export type TAction = TActionSetEntities | TActionSetKeycloakData;
