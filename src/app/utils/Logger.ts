/* eslint-disable no-console */

enum Level {
  TRACE = 0,
  DEBUG = 1,
  INFO = 2,
  WARN = 3,
  ERROR = 4,
  FATAL = 5
}

interface WindowWithLevel extends Window {
  BULLES_LOG_LEVEL?: Level;
}

const defaultLevel =
  process.env.NODE_ENV === 'production' ? Level.ERROR : Level.INFO;

const log = (level: Level, messages: unknown[]) => {
  const { BULLES_LOG_LEVEL } = window as WindowWithLevel;
  const treshold: Level =
    BULLES_LOG_LEVEL === undefined ? defaultLevel : BULLES_LOG_LEVEL;
  if (level >= treshold) {
    if (level >= Level.ERROR)
      console.error(
        `[${level === Level.FATAL ? 'FATAL' : 'ERROR'}]`,
        ...messages
      );
    else if (level === Level.WARN) console.warn('[WARN]', ...messages);
    else if (level === Level.INFO) console.log('[INFO]', ...messages);
    else
      console.debug(
        `[${level === Level.DEBUG ? 'DEBUG' : 'TRACE'}]`,
        ...messages
      );
  }
};
const Logger = {
  trace: (...messages: unknown[]) => log(Level.TRACE, messages),
  debug: (...messages: unknown[]) => log(Level.DEBUG, messages),
  info: (...messages: unknown[]) => log(Level.INFO, messages),
  warn: (...messages: unknown[]) => log(Level.WARN, messages),
  error: (...messages: unknown[]) => log(Level.ERROR, messages),
  fatal: (...messages: unknown[]) => log(Level.FATAL, messages)
};

export default Logger;
