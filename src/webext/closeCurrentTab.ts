import getCurrentTab from './getCurrentTab';

export default () => getCurrentTab().then(tab => chrome.tabs.remove(tab.id));
