import * as R from 'ramda';
import { AppAction } from 'libs/store/actions';

const stripFormMeta = R.compose(
  R.dissocPath<AppAction>(['meta', 'resolve']),
  R.dissocPath<AppAction>(['meta', 'reject'])
);

export default stripFormMeta;
