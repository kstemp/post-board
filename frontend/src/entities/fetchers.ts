import { createEntity, fetchEntity } from './entity';
import { IDType } from './types';

export const fetchCommunityNameForCommunityID = (communityID: IDType) =>
	fetchEntity(`/community/${communityID}`);

export const fetchPostIDsForCommunityID = (
	communityID: IDType,
	offset: number
) => fetchEntity(`/community/${communityID}/top?offset=${offset}`);

export const fetchPostByID = (postID: IDType) => fetchEntity(`/post/${postID}`);

export const fetchMetadataForPostID = (postID: IDType) =>
	fetchEntity(`/post/${postID}?metadata_only=true`);

export const fetchCommentsForPostID = (postID: IDType) =>
	fetchEntity(`/post/${postID}/comments`);

export const createPost = (postText: string, communityID: IDType) =>
	createEntity(`/post?communityID=${communityID}`, postText);

export const createCommentForPostID = (postID: IDType, commentText: string) =>
	createEntity(`/post/${postID}/comments`, commentText);
