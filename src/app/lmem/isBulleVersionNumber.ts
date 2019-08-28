import { gte } from 'semver';

// @todo create a constant with the first version number of Bulle
export default (version: string) => gte(version, '2.3.2');
