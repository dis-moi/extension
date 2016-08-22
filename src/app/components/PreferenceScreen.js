import React, { Component, PropTypes } from 'react';

import { 
  PREFERENCE_SCREEN_PANEL_ABOUT,
  PREFERENCE_SCREEN_PANEL_DEACTIVATED_WEBSITES
} from '../constants/ui';

import PreferenceAboutPanel from './PreferenceAboutPanel';
import PreferenceDeactivatedPanel from './PreferenceDeactivatedPanel';

export default function(props) {
  const {
    preferenceScreenPanel, deactivatedWebsites, 
    onReactivateWebsite, openPrefScreen
  } = props;

  let mainContent;

  switch (preferenceScreenPanel){
    case PREFERENCE_SCREEN_PANEL_ABOUT:
      mainContent = <PreferenceAboutPanel/>;
      break;
    case PREFERENCE_SCREEN_PANEL_DEACTIVATED_WEBSITES:
      mainContent = <PreferenceDeactivatedPanel
        deactivatedWebsites={deactivatedWebsites}
        onReactivateWebsite={onReactivateWebsite}
      />
      break;
    default:
      console.error('Unknown content value', content);
  }

  const changePanel = e => {
    const newContent = e.target.getAttribute('data-panel');
    openPrefScreen(newContent);
  };

  return (<section className="preference-panel wrapperframe">
      <nav>
          <button data-panel={PREFERENCE_SCREEN_PANEL_ABOUT} onClick={changePanel}>A propos</button>
          <button data-panel={PREFERENCE_SCREEN_PANEL_DEACTIVATED_WEBSITES} onClick={changePanel}>
          Sites désactivés
          </button>
      </nav>
      <main>
          {mainContent}
      </main>
  </section>);
  
}

