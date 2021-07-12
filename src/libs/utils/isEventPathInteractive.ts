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
const htmlElementInteractive = (element: HTMLElement) =>
  element.matches &&
  interactiveElementsSelectors.some(selector => element.matches(selector));

export const isEventPathInteractive = (elements?: HTMLElement[] | null) =>
  elements?.some(htmlElementInteractive);
