function originFromEnv(key: string) {
  const origin = process.env[key];
  if (typeof origin !== 'string') {
    throw new TypeError(`Missing LMEM env '${key}': ${origin}`);
  }
  return origin;
}

export const LMEM_BACKEND_ORIGIN = originFromEnv('LMEM_BACKEND_ORIGIN');
