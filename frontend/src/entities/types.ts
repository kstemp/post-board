export type IDType = number;

export type EntityTypeEnum = 'post' | 'comment';

export type TCommunity = {
	id: IDType;
	name: string;
};

type TEntity = {
	entity_id: IDType;
};

// NOTE we use snake_case here since this is how entries are stored in the PostgreSQL database
export type TComment = TEntity & {
	parent_post_id: IDType;

	text: string;
	created_on: string;

	login: string;
};

export type TPost = TEntity & {
	parent_community_id?: IDType;

	text: string;
	created_on: string;

	login: string;
};
