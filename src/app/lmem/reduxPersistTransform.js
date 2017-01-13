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

export function deserialize(string, key){

  if (key === 'criteria' || key === 'editors'){
    return new ImmutableMap(JSON.parse(string, (k, v) => {
      if (Object.prototype.toString.call(v) === '[object Object]')
        return new ImmutableMap(v);
      return v;
    }));
  }
  else if (key === 'dismissedRecos' || key === 'approvedRecos')
    return new ImmutableSet(JSON.parse(string));
  
  return JSON.parse(string, function (k, v) {
    if (k === 'deactivatedWebsites')
      return new Set(v);
    return v; // return everything else unchanged
  });
} 

export default createTransform(serialize, deserialize);