import { MouseEvent } from 'react';
import { Store } from 'redux';
import { close } from 'libs/store/actions/ui';
import { CloseCause } from 'libs/domain/ui';
import { isEventPathInteractive } from '../../libs/utils/isEventPathInteractive';
import { isOpen } from './store/selectors';

interface ExtendMouseEvent extends MouseEvent {
  composedPath: () => HTMLElement[];
}
export default (store: Store) => (e: ExtendMouseEvent) => {
  const state = store.getState();
  const pathElements = e.composedPath && e.composedPath();
  const interactive = isEventPathInteractive(pathElements);

  if (!interactive && isOpen(state)) {
    store.dispatch(close(CloseCause.ClickOutside));
  }
};
