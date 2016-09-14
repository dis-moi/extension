const _LMEM_BACKEND_ORIGIN = process.env.LMEM_BACKEND_ORIGIN;

if(typeof _LMEM_BACKEND_ORIGIN !== 'string'){
  throw new TypeError('Missing LMEM backend origin ' + _LMEM_BACKEND_ORIGIN);
}

export const LMEM_BACKEND_ORIGIN = _LMEM_BACKEND_ORIGIN;