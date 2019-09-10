import { KeycloakInstance } from 'keycloak-js';

export type IDType = number;

// NOTE we use snake_case here since this is how entries are stored in the PostgreSQL database
export type CommentType = {
	id: IDType;
	post_id: number;
	text: string;
};

export type CommunityType = {
	id: IDType;
	name: string;
};

export type PostType = {
	id: IDType;
	text: string;
	community_id: IDType;
};

export type EntityTypeEnum = 'post' | 'comment';

export interface ReducerStateType {
	post: PostType[];
	comment: { [postID: number]: CommentType[] };
	keycloak: KeycloakInstance | null;
}
