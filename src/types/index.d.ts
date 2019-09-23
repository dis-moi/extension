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

interface AppEnv extends NodeJS.ProcessEnv {
  SEND_CONTRIBUTION_FROM: string;
  SEND_CONTRIBUTION_TO: string;
  SEND_IN_BLUE_TOKEN: string;
  SENTRY_DSN: string;
}

declare module '*.png' {
  const value: string;
  export = value;
}
