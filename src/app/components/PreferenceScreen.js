import React, { Component, PropTypes } from 'react';

import { 
  PREFERENCE_SCREEN_PANEL_ABOUT,
  PREFERENCE_SCREEN_PANEL_DEACTIVATED_WEBSITES,
  PREFERENCE_SCREEN_PANEL_CRITERIA,
  PREFERENCE_SCREEN_PANEL_SOURCES,
} from '../constants/ui';

import PreferenceAboutPanel from './PreferenceAboutPanel';
import PreferenceDeactivatedPanel from './PreferenceDeactivatedPanel';
import PreferenceCriteriaPanel from './PreferenceCriteriaPanel';
import PreferenceSourcesPanel from './PreferenceSourcesPanel';

function mainClassName(screenPanel) {
  switch (screenPanel) {
    case PREFERENCE_SCREEN_PANEL_ABOUT:
      return 'preference-about';
    case PREFERENCE_SCREEN_PANEL_DEACTIVATED_WEBSITES:
      return 'preference-deactivated-websites';
    case PREFERENCE_SCREEN_PANEL_CRITERIA:
      return 'preference-criteria';
    case PREFERENCE_SCREEN_PANEL_SOURCES:
      return 'preference-sources';
    default:
      return '';
  }
}

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
        imagesUrl={imagesUrl}
      />);
      break;
    case PREFERENCE_SCREEN_PANEL_CRITERIA:
      mainContent = (<PreferenceCriteriaPanel />);
      break;
    case PREFERENCE_SCREEN_PANEL_SOURCES:
      mainContent = (<PreferenceSourcesPanel />);
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
        <li className="preference-menu-about">
          <button
            data-panel={PREFERENCE_SCREEN_PANEL_ABOUT}
            onClick={changePanel}
            className={'not-button with-image' +
              (preferenceScreenPanel === PREFERENCE_SCREEN_PANEL_ABOUT ? ' active' : '')}>
            <img role="presentation" className="lmem-controls-picto" src={imagesUrl + 'info.svg'} />
            <span>À propos</span>
          </button>
        </li>
        <li className="preference-menu-deactivated">
          <button
            data-panel={PREFERENCE_SCREEN_PANEL_DEACTIVATED_WEBSITES}
            onClick={changePanel}
            className={'not-button with-image' +
              (preferenceScreenPanel === PREFERENCE_SCREEN_PANEL_DEACTIVATED_WEBSITES ? ' active' : '')}>
            <img role="presentation" className="lmem-controls-picto" src={imagesUrl + 'power.svg'} />
            <span>Sites désactivés</span>
          </button>
        </li>
        <li className="preference-menu-criteria">
          <button
            data-panel={PREFERENCE_SCREEN_PANEL_CRITERIA}
            onClick={changePanel}
            className={'not-button with-image' +
            (preferenceScreenPanel === PREFERENCE_SCREEN_PANEL_CRITERIA ? ' active' : '')}>
            <img role="presentation" className="lmem-controls-picto" src={imagesUrl + 'valid.svg'} />
            <span>Critères de choix</span>
          </button>
        </li>
        <li className="preference-menu-sources">
          <button
            data-panel={PREFERENCE_SCREEN_PANEL_SOURCES}
            onClick={changePanel}
            className={'not-button with-image' +
            (preferenceScreenPanel === PREFERENCE_SCREEN_PANEL_SOURCES ? ' active' : '')}>
            <img role="presentation" className="lmem-controls-picto" src={imagesUrl + 'close.svg'} />
            <span>Sources de recommandation</span>
          </button>
        </li>
      </ul>
    </nav>
    <div className="separation-bar"></div>
    <main className={mainClassName(preferenceScreenPanel)}>
      {mainContent}
    </main>
  </section>);
  
}
