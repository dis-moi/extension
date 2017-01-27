import { Map as ImmutableMap, Set as ImmutableSet, Iterable } from 'immutable';
import fromJS from '../../utils/customFromJS';

function flatten(arr) {
  return arr.reduce((flat, toFlatten) => {
    return flat.concat(toFlatten);
  }, []);
}

// outputs the structure of a Map into a list of its key addresses
export function getAddresses(myMap){
  return flatten(myMap.keySeq().map(key => {
    const value = myMap.get(key);

    if (ImmutableMap.isMap(value) && value.size > 0){
      const addresses = getAddresses(value);

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

// takes Maps arguments
export default function initializeState(initialState, loadedState, history){
  
  if (loadedState !== undefined){
    const addresses = getAddresses(initialState);

    addresses.forEach(address => {
      const path = address.split(':');

      if (loadedState.hasIn(path)) // path is present in loaded, just get the corresponding value
        initialState = initialState.setIn(path, loadedState.getIn(path));
      else if (history !== undefined){
        // check in the history if the path has changed
        const oldPath = checkHistory(address, loadedState, history); 
        
        if (oldPath) // get the value
          initialState = initialState.setIn(path, loadedState.getIn(oldPath.split(':')));
        else // no path found, log warning
          console.warn('This path was not found in loaded state', address, '=> initializing...');
      }
    });

    return initialState;
  }
  else
    return fromJS(initialState);
}


