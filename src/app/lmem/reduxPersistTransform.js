import { createTransform } from 'redux-persist';
import { Map as ImmutableMap, Set as ImmutableSet } from 'immutable';

export function serialize(stateObj){
  return JSON.stringify(stateObj, (key, value) => {
    if (Object.prototype.toString.call(value) === '[object Set]') {
      return [...value];
    }
    return value;
  });
} 

export function deserialize(string){
  return JSON.parse(string, (key, value) => {
    let output;

    if (value instanceof Array)
      output = new ImmutableSet(value);
    else if (value instanceof Object)
      output = new ImmutableMap(value);
    else
      output = value;

    return output;
  });
} 

export default createTransform(serialize, deserialize);