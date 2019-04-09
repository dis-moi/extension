// From https://developer.chrome.com/extensions/tabs#type-Tab

type MutedInfoReason =
  | 'user' // A user input action set the muted state.
  | 'capture' // Tab capture was started, forcing a muted state change.
  | 'extension'; // An extension, identified by the extensionId field, set the muted state.

interface MutedInfo {
  muted: boolean; // Whether the tab is muted (prevented from playing sound). The tab may be muted even if it has not played or is not currently playing sound. Equivalent to whether the 'muted' audio indicator is showing.
  reason?: MutedInfoReason; // The reason the tab was muted or unmuted. Not set if the tab's mute state has never been changed.
  extensionId?: string; // The ID of the extension that changed the muted state. Not set if an extension was not the reason the muted state last changed.
}

export interface TabInfo {
  id?: number; // The ID of the tab. Tab IDs are unique within a browser session. Under some circumstances a tab may not be assigned an ID; for example, when querying foreign tabs using the sessions API, in which case a session ID may be present. Tab ID can also be set to chrome.tabs.TAB_ID_NONE for apps and devtools windows.
  index: number; // The zero-based index of the tab within its window.
  windowId: number; // The ID of the window that contains the tab.
  openerTabId?: number; // The ID of the tab that opened this tab, if any. This property is only present if the opener tab still exists.
  highlighted: boolean; // Whether the tab is highlighted.
  active: boolean; // Whether the tab is active in its window. Does not necessarily mean the window is focused.
  pinned: boolean; // Whether the tab is pinned.
  audible?: boolean; // Since Chrome 45. Whether the tab has produced sound over the past couple of seconds (but it might not be heard if also muted). Equivalent to whether the 'speaker audio' indicator is showing.
  discarded: boolean; // Since Chrome 54. Whether the tab is discarded. A discarded tab is one whose content has been unloaded from memory, but is still visible in the tab strip. Its content is reloaded the next time it is activated.
  autoDiscardable: boolean; // Since Chrome 54. Whether the tab can be discarded automatically by the browser when resources are low.
  mutedInfo?: MutedInfo; // Since Chrome 46. The tab's muted state and the reason for the last state change.
  url?: string; // The URL the tab is displaying. This property is only present if the extension's manifest includes the "tabs" permission.
  title?: string; // The title of the tab. This property is only present if the extension's manifest includes the "tabs" permission.
  favIconUrl?: string; // The URL of the tab's favicon. This property is only present if the extension's manifest includes the "tabs" permission. It may also be an empty string if the tab is loading.
  status?: 'loading' | 'complete'; // Either loading or complete.
  incognito: boolean; // Whether the tab is in an incognito window.
  width?: number; // Since Chrome 31. The width of the tab in pixels.
  height?: number; // Since Chrome 31. The height of the tab in pixels.
  sessionId?: string; // Since Chrome 31. The session ID used to uniquely identify a tab obtained from the sessions API.
}

export default TabInfo;
