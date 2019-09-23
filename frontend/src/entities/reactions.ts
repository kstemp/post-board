import { IDType } from './types';
import { createEntity, deleteEntity } from './entity';

export const createReactionForEntityID = (entityID: IDType) =>
	createEntity(`/reactions?entityID=${entityID}`);

export const deleteReactionForEntityID = (entityID: IDType) =>
	deleteEntity(`/reactions?entityID=${entityID}`);
