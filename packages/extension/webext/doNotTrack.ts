function doNotTrack(): boolean {
  const dnt =
    (typeof window !== 'undefined' && window.doNotTrack) ||
    navigator.doNotTrack;

  return dnt === '1' || dnt === 'yes';
}

export default doNotTrack;
