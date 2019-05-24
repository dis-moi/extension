const documentReady = new Promise(resolve => {
  if (document.readyState === 'complete') return resolve();
  window.addEventListener('load', resolve);
});

export default documentReady;
