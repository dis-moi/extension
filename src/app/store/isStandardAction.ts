import { StandardAction } from './types';
import isAction from './isAction';

const standardActionAllowedProperties = ['type', 'payload', 'meta', 'error'];

const isStandardAction = (x: unknown): x is StandardAction =>
  isAction(x) &&
  Object.keys(x).every(p => standardActionAllowedProperties.includes(p));

export default isStandardAction;
