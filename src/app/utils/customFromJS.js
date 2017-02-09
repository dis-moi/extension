import { fromJS as _fromJS, Iterable } from 'immutable';

export default function (v){
  return _fromJS(v, (key, value) => {
    const isIndexed = Iterable.isIndexed(value);
    return isIndexed ? value.toSet() : value.toMap();
  });
}