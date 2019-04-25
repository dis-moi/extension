import { Store } from 'redux';
import { close } from 'app/actions/ui';
import { isOpen } from './selectors';

export default (store: Store) => () => {
  const state = store.getState();

  if (isOpen(state)) {
    store.dispatch(close());
  }
};
