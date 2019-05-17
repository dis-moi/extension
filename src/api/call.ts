import fetch from 'isomorphic-fetch';
import { LMEM_BACKEND_ORIGIN } from 'app/constants/origins';

export const get = (path: string) =>
  fetch(path.startsWith('http') ? path : LMEM_BACKEND_ORIGIN + path).then(
    response => {
      if (response.status >= 400) {
        throw new Error('Bad response from server');
      }
      return response.json();
    }
  );

export const post = (path: string, data: {} | []) =>
  fetch(path.startsWith('http') ? path : LMEM_BACKEND_ORIGIN + path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(response => {
    if (response.status >= 400) {
      throw new Error('Bad response from server');
    }
    if (response.status === 204) {
      return true;
    }
    return response.json();
  });
