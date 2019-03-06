export const loadHeap = (appId: string): Promise<Heap> => {
  const heap = (window as CustomWindow).heap;
  if (heap) {
    heap.load(appId, { forceSSL: true });
  }

  return new Promise(resolve => {
    (function heapLoader() {
      if (heap && heap.loaded && heap.userId) resolve(heap);
      else setTimeout(heapLoader, 100);
    })();
  });
};

export default loadHeap;
