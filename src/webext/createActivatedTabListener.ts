import { TabActiveInfo } from './types';

type Emit = (tabId: number) => void;

export default (emit: Emit) => {
  const handleTabActivated = ({ tabId }: TabActiveInfo) => {
    emit(tabId);
  };

  browser.tabs.onActivated.addListener(handleTabActivated);

  // unsubscribe
  return () => {
    browser.tabs.onActivated.removeListener(handleTabActivated);
  };
};
