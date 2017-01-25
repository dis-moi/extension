import { Map as ImmutableMap, Set as ImmutableSet, Iterable } from 'immutable';
import fromJS from '../../../utils/customFromJS';

function flatten(arr) {
  return arr.reduce((flat, toFlatten) => {
    return flat.concat(toFlatten);
  }, []);
}

// outputs the structure of an object into a list of its key addresses
export function getAddresses(object){
  return flatten(Object.keys(object).map(key => {
    const value = object[key];

    if (value instanceof Object && !Array.isArray(value)){
      return getAddresses(value).map(subkey => {
        return [key, subkey].join(':');
      });
    }
    else
      return key;
  }));
}

// check in the state history log the evolutions of state structure
export function checkHistory(path, loadedState, history){
  let tempPath = path;
  let output = undefined;

  history.forEach((value, key) => {
    const oldPath = value.get(tempPath);

    if (oldPath){
      // check if oldPath is in the current version of history and exists in loadedState
      if (loadedState.hasIn(oldPath.split(':'))){ 
        output = oldPath;
        return false;
      } else {
        tempPath = oldPath;
        return true;
      }
    } else
      return true;
  });

  return output;
}

export default function initializeStateAsMap(initialState, loadedState, history){
  
  if (loadedState !== undefined){
    const addresses = getAddresses(initialState);

    let initialStateMap = fromJS(initialState);
    const loadedStateMap = fromJS(loadedState);
    const historyMap = fromJS(history);

    addresses.forEach(address => {
      const path = address.split(':');

      if (loadedStateMap.hasIn(path)) // path is present in loaded, just get the corresponding value
        initialStateMap = initialStateMap.setIn(path, loadedStateMap.getIn(path));
      else if (history !== undefined){
        // check in the history if the path has changed
        const oldPath = checkHistory(address, loadedStateMap, historyMap).split(':'); 
        
        if (oldPath) // get the value
          initialStateMap = initialStateMap.setIn(path, loadedStateMap.getIn(oldPath));
        else // no path found, log warning
          console.warning('This path was not found in loaded state', address);
      }
    });

    return initialStateMap;
  }
  else
    return fromJS(initialState);
}


