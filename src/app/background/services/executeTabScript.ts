import Tab from 'app/lmem/Tab';

export type ExecuteContentScript = (tab: Tab) => Promise<unknown[]>;

export const executeTabScript = (code: string): ExecuteContentScript => (
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
