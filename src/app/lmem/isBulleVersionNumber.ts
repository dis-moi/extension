import { gte } from 'semver';
import { version } from '../../../package.json';

// @todo create a constant with the first version number of Bulle
export default (v: string) => gte(v, version);
