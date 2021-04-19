import { BaseAction } from '.';

export const I18N_READY = 'EXTENSION/I18N_READY';
export interface I18nReady extends BaseAction {
  type: typeof I18N_READY;
}

export const i18nReady = (): I18nReady => ({
  type: I18N_READY
});
