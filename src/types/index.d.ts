interface Heap {
  loaded: boolean;
  userId: string;
  load: (appId: string, options: { forceSSL: boolean }) => void;
  track: (actionType: string, data: {}) => void;
}

interface CustomWindow extends Window {
  heap?: Heap;
  __LMEM__CONTENT_SCRIPT_INJECTED__?: boolean;
}
