import { fetchEntityAndPlaceInStore } from './entity';

export const fetchCommunities = () => {
	fetchEntityAndPlaceInStore('communities', 'community', 'communities');
};
