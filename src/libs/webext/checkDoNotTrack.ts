export function doNotTrackSettingFromNavigatorIsActivated(): boolean {
  const doNotTrack = window.doNotTrack || navigator.doNotTrack;

  if (doNotTrack === '1' || doNotTrack === 'yes') {
    return true;
  }

  return false;
}
