import { IDType } from './types';
import { fetchEntity } from './entity';

export const createReactionForEntityID = (entityID: IDType) =>
	fetchEntity(`/reactions?entityID=${entityID}`, 'POST', null, {}, false);

export const deleteReactionForEntityID = (entityID: IDType) =>
	fetchEntity(`/reactions?entityID=${entityID}`, 'DELETE', null, {}, false);
