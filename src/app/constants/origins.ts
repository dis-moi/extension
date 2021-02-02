function originFromEnv(key: string) {
  const origin = process.env[key];
  if (typeof origin !== 'string') {
    throw new TypeError(`Missing LMEM env '${key}': ${origin}`);
  }
  return origin;
}

export const BACKEND_ORIGIN = process.env.NEXT_PUBLIC_BACKEND_ORIGIN;
console.log('==> BACKEND_ORIGIN:', BACKEND_ORIGIN);
