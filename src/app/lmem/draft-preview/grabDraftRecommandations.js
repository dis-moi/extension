/* eslint-disable */
'use strict';

if(!window.FAKING){
  /**
   * FAKING the data element until the backend actually adds it;
   */
  const fakeData = [
    {
      'id': 1,
      'recommendation': {
        'id': 1,

        // UPCOMING in next version of backend
        'visibility': 'private',
        
        
        'alternatives': [
          {
            'id': 1,
            'url_to_redirect': 'https://jekyllrb.com/',
            'label': 'Voir le comparatif'
          }
        ],
        'matching_contexts': {
          '1': {
            'id': 2,
            'url_regex': '.*wordpress.com.*',
            'description': 'Jekyll'
          }
        },
        'filters': [
          {
            'id': 1,
            'label': 'health',
            'description': 'Santé'
          },
          {
            'id': 2,
            'label': 'ethics',
            'description': 'Éthique'
          },
          {
            'id': 3,
            'label': 'quality',
            'description': 'Qualité'
          },
          {
            'id': 4,
            'label': 'price',
            'description': 'Prix'
          }
        ],
        'title': 'Jekyll > Wordpress',
        'contributor': {
          'id': 2,
          'name': 'Dav Bru',
          'organization': 'Le Même en Mieux',
          'updated_at': '2016-06-14T13:39:01+0000',
          'recommendations': [],
          'image': 'photo-Maarten-pr-profil.jpg'
        },
        'description': 'Que vous ayez un usage basique, avancé, professionnel, geek, joueur régulier ou même photographe amateur, il existe de meilleurs smarpthones en termes de qualité/prix, santé et éthique de la marque.'
      },
      'url_regex': '.*wordpress.com.*',
      'description': 'Yooooooooooo'
    }
  ];

  const s = document.createElement('script');
  s.id = 'lmem-draft-recommandations';
  s.textContent = JSON.stringify(fakeData);
  document.body.appendChild(s);
  window.FAKING = true;
}
  /**
   * END OF FAKING
   */



chrome.runtime.onConnect.addListener(function listener(portToBackground) {




  const scriptElem = document.querySelector('#lmem-draft-recommandations');

  if (scriptElem) {
    let data;

    try { data = JSON.parse(scriptElem.textContent); }
    catch (e) {
      console.error(
        'failed to parse #lmem-draft-recommandations as JSON',
        scriptElem.textContent
      );
    }

    if (data) {
      console.info('Found draft recommandations', data);
      portToBackground.postMessage(data);
    }
    else {
      console.error('No data to send to background');
    }

    scriptElem.remove(); // next content script trying to querySelector it will fail
  }
  else {
    console.error(
      'No #lmem-draft-recommandations element',
      '(may have been removed by previous content script)'
    );
  }
});



