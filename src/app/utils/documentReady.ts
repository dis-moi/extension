const documentReady = new Promise<void>(resolve => {
  if (document.readyState === 'complete') return resolve();
  window.addEventListener('load', () => resolve());
});

export default documentReady;
