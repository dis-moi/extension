type Emit = (tabId: number) => void;

export default (emit: Emit) => {
  const handleTabActivated = ({ tabId }: chrome.tabs.TabActiveInfo) => {
    emit(tabId);
  };

  chrome.tabs.onActivated.addListener(handleTabActivated);

  // unsubscribe
  return () => {
    chrome.tabs.onActivated.removeListener(handleTabActivated);
  };
};
