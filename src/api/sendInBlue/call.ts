import fetch from 'isomorphic-fetch';

type Method = 'GET' | 'POST';

const call = (path: string, data?: {} | [], method: Method = 'GET') =>
  fetch(`https://api.sendinblue.com/v3/${path}`, {
    method,
    body: JSON.stringify(data),
    headers: {
      'api-key': process.env.SEND_IN_BLUE_TOKEN as string,
      'Content-Type': 'application/json'
    }
  }).then(response => {
    if (response.status >= 400) {
      throw new Error('Bad response from server');
    }
    if (response.status >= 200 && response.status < 300) {
      return true;
    }
    return response.json();
  });

export const get = (path: string) => call(path);

export const post = (path: string, data: {} | []) => call(path, data, 'POST');
