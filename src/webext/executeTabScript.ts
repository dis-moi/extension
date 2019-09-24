import Tab from 'app/lmem/tab';

export type ExecuteContentScript = (tab: Tab) => Promise<unknown[]>;

const executeTabScript = (code: string): ExecuteContentScript => (
  tab: Tab
): Promise<unknown[]> =>
  new Promise(resolve => {
    if (tab.url.startsWith('http')) {
      chrome.tabs.executeScript(
        tab.id,
        {
          code,
          runAt: 'document_end'
        },
        result => {
          resolve(result);
        }
      );
    }
  });

export default executeTabScript;
