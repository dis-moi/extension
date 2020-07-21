export default interface Tab {
  id: number;
  url?: string;
  ready?: boolean;
  options?: boolean;
  notices?: number[];
}

export interface TabWithURL extends Tab {
  url: string;
}

export const isOptionsTab = (tab: Tab) => Boolean(tab && tab.options === true);

export const isTabReady = (tab: Tab) => Boolean(tab && tab.ready === true);
