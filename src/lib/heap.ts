export const loadHeap = (appId: string): Promise<Heap> => {

  // heap lib injection in window object
  /* tslint:disable */
  // @ts-ignore
  window.heap = window.heap||[];
  // @ts-ignore
  window.heap.load=function(e,t) {
    // @ts-ignore
    window.heap.appid=e,window.heap.config=t=t||{};var r=t.forceSSL||"https:"===document.location.protocol,a=document.createElement("script");a.type="text/javascript",a.async=!0,a.src=(r?"https:":"http:")+"//cdn.heapanalytics.com/js/heap-"+e+".js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(a,n);for(var o=function(e){return function(){heap.push([e].concat(Array.prototype.slice.call(arguments,0)))}},p=["addEventProperties","addUserProperties","clearEventProperties","identify","removeEventProperty","setEventProperties","track","unsetEventProperty"],c=0;c<p.length;c++)heap[p[c]]=o(p[c])
  };
  /* tslint:enable */

  const win = window as CustomWindow;
  if (win.heap) {
    win.heap.load(appId, { forceSSL: true });
  }

  return new Promise(resolve => {
    (function heapLoader() {
      if (heap && heap.loaded && heap.userId) resolve(heap);
      else setTimeout(heapLoader, 100);
    })();
  });
};

export default loadHeap;
