import { gte } from 'semver';

export const FIRST_BULLES_VERSION = '3.0.0';

export default (v: string) => gte(v, FIRST_BULLES_VERSION);
