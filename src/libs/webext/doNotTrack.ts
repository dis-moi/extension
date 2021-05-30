function doNotTrack(): boolean {
  const doNotTrack = window.doNotTrack || navigator.doNotTrack;

  return doNotTrack === '1' || doNotTrack === 'yes';
}

export default doNotTrack;
