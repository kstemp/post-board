import { createEntity, fetchEntity } from './entity';
import {
	IDType,
	ICommunity,
	TComment,
	TPost,
	TPostMetadata,
	IEntityIDs
} from './types';

export const fetchCommunityMetadataForCommunityID = (communityID: IDType) =>
	fetchEntity<ICommunity>(`/community/${communityID}`);

export const fetchPostIDsForCommunityID = (
	communityID: IDType,
	offset: number
) => fetchEntity<IEntityIDs>(`/community/${communityID}/top?offset=${offset}`);

export const fetchPostByID = (postID: IDType) =>
	fetchEntity<TPost>(`/post/${postID}`);

export const fetchMetadataForPostID = (postID: IDType) =>
	fetchEntity<TPostMetadata>(`/post/${postID}?metadata_only=true`);

export const fetchCommentsForPostID = (postID: IDType) =>
	fetchEntity<TComment[]>(`/post/${postID}/comments`);

export const createPost = (postText: string, communityID: IDType) =>
	createEntity(
		`/post?communityID=${communityID}`,
		JSON.stringify({ text: postText })
	);

export const createCommentForPostID = (postID: IDType, commentText: string) =>
	createEntity(
		`/post/${postID}/comments`,
		JSON.stringify({ text: commentText })
	);
