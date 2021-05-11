import React from 'react';

interface CustomWindow extends Window {
  __BULLES__CONTENT_SCRIPT_INJECTED__?: boolean;
}

interface AppEnv extends NodeJS.ProcessEnv {
  SENTRY_DSN: string;
  PLATFORM: 'firefox' | 'chromium';
  PROFILES_ORIGIN: string;
  POPULAR_CONTRIBUTORS_IDS: string;
  TRACKING_BACKEND?: string;
}

// @see https://en.wikipedia.org/wiki/Three-valued_logic
export type trilean = boolean | undefined;

export type As = keyof JSX.IntrinsicElements | React.ComponentType<any>; // eslint-disable-line @typescript-eslint/no-explicit-any

export type Brand<T, B> = T & { __brand: B };
