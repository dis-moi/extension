import { Action } from 'redux';

const isAction = (x: unknown): x is Action =>
  typeof x === 'object' && 'type' in (x as object);

export default isAction;
