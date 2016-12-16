export default function (method, url, data){
  return new Promise(function (resolve, reject){
    const xhr = new XMLHttpRequest();

    xhr.open(method, url);
    if(data !== undefined && typeof data !== 'string' && !(data instanceof FormData))
      xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

    xhr.responseType = 'json';

    xhr.addEventListener('load', function (){
      if(xhr.status < 400)
        resolve(xhr.response);
      else {
        reject(Object.assign(
          new Error('HTTP error'),
          {
            HTTPstatus: xhr.status,
            text: xhr.responseText,
            error: 'unknown'
          }));
      }    
    });

    xhr.addEventListener('error', reject);

    if(data === undefined || typeof data === 'string' || data instanceof FormData)
      xhr.send(data);
    else
      xhr.send(JSON.stringify(data));
  });
}
