import { createTransform } from 'redux-persist';

export function serialize(stateObj){
  return JSON.stringify(stateObj, (key, value) => {
    if (Object.prototype.toString.call(value) === '[object Set]') {
      return [...value];
    }
    return value;
  });
} 

export function deserialize(string){
  return JSON.parse(string, function (k, v) {
    if (k === 'deactivatedWebsites') {
      return new Set(v);
    }
    return v; // return everything else unchanged
  });
} 

export default createTransform(serialize, deserialize);