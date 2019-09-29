export type IDType = number;

export type EntityTypeEnum = 'post' | 'comment';

export interface ITokenPayload {
	token: string;
}

export interface ICommunity {
	id: IDType;
	name: string;
	followed: boolean;
}

export interface IEntityIDs {
	entity_ids: IDType[];
}

// NOTE we use snake_case here since this is how entries are stored in the PostgreSQL database
type TEntity = {
	entity_id: IDType;

	created_on: string;

	user_id: IDType;
};

export type TCommentBase = TEntity & {
	parent_post_id: IDType;

	text: string;
};

export type TPostBase = {
	parent_community_id?: IDType;

	text: string;
};

export interface IEntityMetadata {
	comment_count: number;
	reaction_count: number;
	reacted: boolean;
}

export type TPost = TEntity & TPostBase & IEntityMetadata;

export type TComment = TEntity & TCommentBase & IEntityMetadata;

export type TContentSorting = 'new' | 'top';
