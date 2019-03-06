import { debounce } from 'lodash-es';
import { LMEM_BACKEND_ORIGIN } from '../../constants/origins';
import TabChangeInfo = chrome.tabs.TabChangeInfo;
import Tab = chrome.tabs.Tab;

function isRecommendationBackendURL(url: string) {
  const { origin, pathname, search } = new URL(url);

  return (
    origin === LMEM_BACKEND_ORIGIN &&
    pathname.includes('/admin') &&
    search.includes('action=list') &&
    search.includes('entity=Recommendation')
  );
}

export default function(
  tabs: any,
  contentCode: string,
  updateDraftRecommendations: (msg: any) => void
) {
  // The onCreated and onUpdated events lead to too many calls by default
  // Let's debounce 2secs
  const grabDraftRecommendations = debounce(
    function(tabId: number) {
      tabs.executeScript(
        tabId,
        {
          code: contentCode,
          runAt: 'document_end'
        },
        () => {
          console.log('Finished loading drafts content script');
          const tabPort = tabs.connect(tabId);

          tabPort.onMessage.addListener((msg: any) => {
            console.log('message from draft grabing content script', msg);

            updateDraftRecommendations(msg);
          });
        }
      );
    },
    2 * 1000,
    { leading: true, trailing: false }
  );

  tabs.onCreated.addListener(({ id, url }: Tab) => {
    if (url && id && isRecommendationBackendURL(url)) {
      grabDraftRecommendations(id);
    }
  });

  tabs.onUpdated.addListener(
    (id: number, { status, url: newUrl }: TabChangeInfo, { url }: Tab) => {
      const u = newUrl || url;
      if (status === 'loading' && u && isRecommendationBackendURL(u)) {
        grabDraftRecommendations(id);
      }
    }
  );
}
