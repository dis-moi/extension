"use strict";

chrome.runtime.onConnect.addListener(function listener(portToBackground) {
  const scriptElem = document.querySelector('#lmem-draft-recommandations');

  if(scriptElem){
    let data;

    try{ data = JSON.parse(scriptElem.textContent); }
    catch(e){
      console.error('failed to parse #lmem-draft-recommandations as JSON', scriptElem.textContent);
    }

    if(data){
      portToBackground.postMessage(data);
    }
    else{
      console.error('No data to send to background');
    }
  }
  else{
    console.error('No #lmem-draft-recommandations element');
  }
});

