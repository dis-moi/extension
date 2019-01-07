import {
  REDUCE_RECOMMENDATION_IFRAME,
  EXTEND_RECOMMENDATION_IFRAME,
  DEACTIVATE,
  UNINSTALL,
  OPEN_PREFERENCE_PANEL,
  CLOSE_PREFERENCE_PANEL,
  CHECKOUT_RECO_RESOURCE_BUTTON,
  CHECKOUT_RECO_RESOURCE_LINK,
  CHECKOUT_RECO_ALTERNATIVE,
  CHECKOUT_RECO_EDITOR,
  POPUP_CLICK,
} from '../../constants/ActionTypes';
import createBackgroundAction from '../createBackgroundAction';

export const reduce = createBackgroundAction(REDUCE_RECOMMENDATION_IFRAME);
export const extend = createBackgroundAction(EXTEND_RECOMMENDATION_IFRAME);
export const deactivate = createBackgroundAction(DEACTIVATE, ({ where, duration }) => ({ where, duration }));
export const closePrefScreen = createBackgroundAction(CLOSE_PREFERENCE_PANEL);
export const openPrefScreen = createBackgroundAction(OPEN_PREFERENCE_PANEL, panel => ({ panel }));
export const checkOutResourceButton = createBackgroundAction(CHECKOUT_RECO_RESOURCE_BUTTON, resource => ({ resource }));
export const checkOutResourceLink = createBackgroundAction(CHECKOUT_RECO_RESOURCE_LINK, resource => ({ resource }));
export const checkOutAlternative = createBackgroundAction(CHECKOUT_RECO_ALTERNATIVE, alternative => ({ alternative }));
export const checkOutEditor = createBackgroundAction(CHECKOUT_RECO_EDITOR, editor => ({ editor }));
export const uninstall = createBackgroundAction(UNINSTALL, () => ({ datetime: new Date() }));
export const popupClick = createBackgroundAction(POPUP_CLICK, target => ({ target }));
