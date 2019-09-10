import {
	EntityTypeEnum,
	IDType,
	CommunityType,
	CommentType,
	PostType
} from './types';

import { KeycloakInstance } from 'keycloak-js';

export const ACTION_SET_ENTITIES = 'ACTION_SET_ENTITIES';
export const ACTION_SET_KEYCLOAK = 'ACTION_SET_KEYCLOAK';

interface TActionSetEntities {
	type: 'ACTION_SET_ENTITIES';
	data: {
		entityType: EntityTypeEnum;
		parentID?: IDType;
		entities: CommunityType | PostType | CommentType;
	};
}

interface TActionSetKeycloak {
	type: 'ACTION_SET_KEYCLOAK';
	keycloak: KeycloakInstance | null;
}

export type TAction = TActionSetEntities | TActionSetKeycloak;
