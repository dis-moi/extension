import React from 'react';

interface CustomWindow extends Window {
  __BULLES__CONTENT_SCRIPT_INJECTED__?: boolean;
}

interface AppEnv extends NodeJS.ProcessEnv {
  SEND_CONTRIBUTION_FROM: string;
  SEND_CONTRIBUTION_TO: string;
  SEND_IN_BLUE_TOKEN: string;
  SENTRY_DSN: string;
  PLATFORM: 'firefox' | 'chromium';
  PROFILES_ORIGIN: string;
  POPULAR_CONTRIBUTORS_IDS: string;
}

declare module '*.png' {
  const value: string;
  export = value;
}

// @see https://en.wikipedia.org/wiki/Three-valued_logic
export type trilean = boolean | undefined;

export type As = keyof JSX.IntrinsicElements | React.ComponentType<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
