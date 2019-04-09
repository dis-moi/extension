export type ExecuteContentScript = (tab: number, url: string) => Promise<any[]>;

export const executeTabScript = (code: string): ExecuteContentScript => (
  tab: number,
  url: string
): Promise<any[]> =>
  new Promise(resolve => {
    if (url.startsWith('http')) {
      chrome.tabs.executeScript(
        tab,
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
