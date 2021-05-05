import { MouseEvent } from 'react';
import { Store } from 'redux';
import { close } from '../../../libs/store/actions/ui';
import { isOpen } from './store/selectors';
import { CloseCause } from '../../../../../libs/lmem/ui';

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

export const isHtmlElementInteractive = (element?: HTMLElement | null) =>
  element &&
  element.matches &&
  interactiveElementsSelectors.some(selector => element.matches(selector));

export default (store: Store) => (e: MouseEvent) => {
  const state = store.getState();

  const element = e.target as HTMLElement;
  const parentElement = element.parentElement;

  const interactive =
    isHtmlElementInteractive(element) ||
    isHtmlElementInteractive(parentElement);

  if (!interactive && isOpen(state)) {
    store.dispatch(close(CloseCause.ClickOutside));
  }
};
