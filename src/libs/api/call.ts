import fetch from 'isomorphic-fetch';
import * as R from 'ramda';
import { BACKEND_ORIGIN } from './constants/origins';
import { APIStatusCodeError } from './APIStatusCodeError';

type GetParamValue = string | string[];
export type GetParams = {} | { [key: string]: GetParamValue };

type BuildQueryString = (params: GetParams) => string;
export const buildQueryString: BuildQueryString = R.ifElse(
  R.isEmpty,
  R.always(''),
  R.pipe(
    R.toPairs,
    R.map(([key, value]: R.KeyValuePair<string, GetParamValue>) =>
      Array.isArray(value)
        ? value
            .map(
              (valueItem: string) =>
                `${encodeURIComponent(key)}[]=${encodeURIComponent(valueItem)}`
            )
            .join('&')
        : `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    ),
    R.join('&'),
    R.concat('?')
  )
);

export const checkStatus = (response: Response) => {
  const { status } = response;
  if (status >= 400) {
    throw new APIStatusCodeError(response);
  }

  return response;
};

export const get = (path: string, data: object = {}) => {
  const endpoint = path.startsWith('http') ? path : BACKEND_ORIGIN + path;
  return fetch(`${endpoint}${buildQueryString(data)}`, { mode: 'cors' })
    .then(checkStatus)
    .then(response => response.json());
};

export const post = (path: string, data: {} | []) =>
  fetch(path.startsWith('http') ? path : BACKEND_ORIGIN + path, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(checkStatus)
    .then(response => {
      if (response.status === 204) {
        return true;
      }
      return response.json();
    });
