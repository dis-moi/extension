import { Store } from 'redux';
import { close } from 'app/actions/ui';
import { isOpen } from './selectors';
import { CloseCause } from '../lmem/ui';

export const interactiveElementsSelectors: string[] = [
  'a',
  'details',
  'dialog',
  'menu',
  'menuitem',
  'summary',
  'button',
  'datalist',
  'input',
  'label',
  'meter',
  'optgroup',
  'option',
  'select',
  'textarea',
  '[onclick]'
];

export const isHtmlElementInteractive = (element: HTMLElement) =>
  interactiveElementsSelectors.some(selector => element.matches(selector));

export default (store: Store) => (e: MouseEvent) => {
  const state = store.getState();

  const element = e.target as HTMLElement;
  const interactive = isHtmlElementInteractive(element);

  if (!interactive && isOpen(state)) {
    store.dispatch(close(CloseCause.ClickOutside));
  }
};
