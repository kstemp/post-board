import { IDType } from './types';
import { createEntity } from './entity';

export const createReactionForEntityID = (entityID: IDType) =>
	createEntity(`/reactions?entityID=${entityID}`);
