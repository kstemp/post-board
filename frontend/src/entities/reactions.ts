import { IDType } from './types';
import { fetchEntity } from './entity';

export const createReactionForEntityID = (entityID: IDType) =>
	fetchEntity(`/reactions?entityID=${entityID}`);
