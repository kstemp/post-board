import { createEntity, fetchEntity } from './entity';
import {
	IDType,
	TComment,
	TPost,
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

export const fetchPostByID = (postID: IDType) =>
	fetchEntity<TPost>(`/post/${postID}`);

export const fetchMetadataForPostID = (postID: IDType) =>
	fetchEntity<IEntityMetadata>(`/post/${postID}?metadata_only=true`);

export const fetchCommentsForPostIDAndParentCommentID = (
	postID: IDType,
	parent_comment_id?: IDType
) =>
	fetchEntity<TComment[]>(
		`/post/${postID}/comments${
			parent_comment_id ? `?parent_comment_id=${parent_comment_id}` : ''
		}`
	);

export const fetchUser = (userID: IDType) =>
	fetchEntity<IUser>(`/users/${userID}`);

export const fetchUserProfile = (userID: IDType) =>
	fetchEntity<TUserProfile>(`/users/${userID}/profile`);

export const createPost = (text: string, board_id: string) =>
	createEntity(`/post?board_id=${board_id}`, JSON.stringify({ text: text }));

/* board-related */
export const createBoard = (id: string, title: string) =>
	createEntity(`/boards`, JSON.stringify({ id: id, title: title }));

export const fetchBoardMetadata = (id: string) =>
	fetchEntity<IBoard>(`/boards/${id}`);

export const createCommentForPostID = (postID: IDType, commentText: string) =>
	createEntity(
		`/post/${postID}/comments`,
		JSON.stringify({ text: commentText })
	);

export const createCommentForPostIDAndParentCommentID = (
	postID: IDType,
	parent_comment_id: IDType,
	commentText: string
) =>
	createEntity<TComment>(
		`/post/${postID}/comments?parent_comment_id=${parent_comment_id}`,
		JSON.stringify({ text: commentText }),
		true
	);
