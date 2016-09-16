import React, { Component, PropTypes } from 'react';

import { 
  PREFERENCE_SCREEN_PANEL_ABOUT,
  PREFERENCE_SCREEN_PANEL_DEACTIVATED_WEBSITES
} from '../constants/ui';

import PreferenceAboutPanel from './PreferenceAboutPanel';
import PreferenceDeactivatedPanel from './PreferenceDeactivatedPanel';

export default function (props) {
  const {
    preferenceScreenPanel, deactivatedWebsites, 
    onReactivateWebsite, openPrefScreen, imagesUrl,
    onInstalledDetails
  } = props;

  let mainContent;

  switch (preferenceScreenPanel){
    case PREFERENCE_SCREEN_PANEL_ABOUT:
      mainContent = (<PreferenceAboutPanel
        onInstalledDetails={onInstalledDetails}
      />);
      break;
    case PREFERENCE_SCREEN_PANEL_DEACTIVATED_WEBSITES:
      mainContent = (<PreferenceDeactivatedPanel
        deactivatedWebsites={deactivatedWebsites}
        onReactivateWebsite={onReactivateWebsite}
      />);
      break;
    default:
      console.error('Unknown content value', preferenceScreenPanel);
  }

  const changePanel = e => {
    const newContent = e.currentTarget.getAttribute('data-panel');
    openPrefScreen(newContent);
  };

  return (<section className="preference-panel">
    <nav>
      <ul>
        <li>
          <button
            data-panel={PREFERENCE_SCREEN_PANEL_ABOUT}
            onClick={changePanel}
            className={'not-button with-image' +
              (preferenceScreenPanel === PREFERENCE_SCREEN_PANEL_ABOUT ? ' active' : '')}>
            <img role="presentation" className="lmem-controls-picto" src={imagesUrl + 'info.svg'} />
            <span>À propos</span>
          </button>
        </li>
        <li>
          <button
            data-panel={PREFERENCE_SCREEN_PANEL_DEACTIVATED_WEBSITES}
            onClick={changePanel}
            className={'not-button with-image' +
              (preferenceScreenPanel === PREFERENCE_SCREEN_PANEL_DEACTIVATED_WEBSITES ? ' active' : '')}>
            <img role="presentation" className="lmem-controls-picto" src={imagesUrl + 'power.svg'} />
            <span>Sites désactivés</span>
          </button>
        </li>
      </ul>
    </nav>
    <div className="separation-bar"></div>
    <main>
      {mainContent}
    </main>
  </section>);
  
}
