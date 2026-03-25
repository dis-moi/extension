import { RouterRootState } from './types';

export const getLocation = (state: RouterRootState) => state.router.location;
