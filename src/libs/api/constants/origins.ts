function originFromEnv(key: string) {
  const origin = process.env[key];
  if (typeof origin !== 'string') {
    throw new TypeError(`Missing domain env '${key}': ${origin}`);
  }
  return origin;
}

export const BACKEND_ORIGIN = originFromEnv('BACKEND_ORIGIN');
