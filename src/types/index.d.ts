interface CustomWindow extends Window {
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
