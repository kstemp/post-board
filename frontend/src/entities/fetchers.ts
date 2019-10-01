import { createEntity, fetchEntity } from './entity';
import {
	IDType,
	TEntity,
	IEntityMetadata,
	IEntityIDs,
	TContentSorting,
	IUser,
	TUserProfile,
	IBoard
} from './types';
export const fetchPostIDsForBoardID = (
	boardID: string,
	offset: number,
	contentSorting: TContentSorting
) =>
	fetchEntity<IEntityIDs>(
		`/boards/${boardID}/${contentSorting}?offset=${offset}`
	);

export const fetchEntityByID = (id: IDType) =>
	fetchEntity<TEntity>(`/entities/${id}`);

export const fetchEntitiesByParentID = (id: IDType) =>
	fetchEntity<TEntity[]>(`/entities/${id}/children`);

export const createPost = (text: string, board_id: string) =>
	createEntity(`/boards/${board_id}`, JSON.stringify({ text: text }));

export const createCommentForParentID = (parentID: IDType, text: string) =>
	createEntity<TEntity>(
		`/entities/${parentID}/`,
		JSON.stringify({ text: text }),
		true
	);
/*
export const fetchMetadataForPostID = (postID: IDType) =>
	fetchEntity<IEntityMetadata>(`/post/${postID}?metadata_only=true`);
*/

export const fetchUser = (userID: IDType) =>
	fetchEntity<IUser>(`/users/${userID}`);

export const fetchUserProfile = (userID: IDType) =>
	fetchEntity<TUserProfile>(`/users/${userID}/profile`);

/* board-related */
export const createBoard = (id: string, title: string) =>
	createEntity(`/boards`, JSON.stringify({ id: id, title: title }));

export const fetchBoardMetadata = (id: string) =>
	fetchEntity<IBoard>(`/boards/${id}`);

/*
export const createCommentForPostIDAndParentCommentID = (
	postID: IDType,
	parent_comment_id: IDType,
	commentText: string
) =>
	createEntity<TEntity>(
		`/post/${postID}/comments?parent_comment_id=${parent_comment_id}`,
		JSON.stringify({ text: commentText }),
		true
	);
*/
