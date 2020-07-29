export default interface Tab {
  id: number;
  url: string;
  ready?: boolean;
  options?: boolean;
  notices?: number[];
}

export const OPTIONS_MENU_ITEM_ID = 'options';

export const isOptionsTab = (tab: Tab) => Boolean(tab && tab.options === true);

export const isTabReady = (tab: Tab) => Boolean(tab && tab.ready === true);
