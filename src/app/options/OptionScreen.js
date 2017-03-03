import React, { Component, PropTypes } from 'react';

import { 
  PREFERENCE_SCREEN_PANEL_ABOUT,
  PREFERENCE_SCREEN_PANEL_CRITERIA,
  PREFERENCE_SCREEN_PANEL_SOURCES,
} from '../constants/ui';

import PreferenceAboutPanel from '../content/components/PreferenceAboutPanel';
import PreferenceCriteriaPanel from '../content/components/PreferenceCriteriaPanel';
import PreferenceSourcesPanel from '../content/components/PreferenceSourcesPanel';

function mainClassName(screenPanel) {
  switch (screenPanel) {
    case PREFERENCE_SCREEN_PANEL_ABOUT:
      return 'preference-about';
    case PREFERENCE_SCREEN_PANEL_CRITERIA:
      return 'preference-criteria';
    case PREFERENCE_SCREEN_PANEL_SOURCES:
      return 'preference-sources';
    default:
      return '';
  }
}

export default class OptionScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      screen: PREFERENCE_SCREEN_PANEL_ABOUT
    };
  }

  render(props) {
    const {
      imagesUrl, onInstalledDetails, uninstall,
      criteria, selectCriterion, unselectCriterion,
      editors, excludeEditor, includeEditor
    } = this.props;

    const { screen } = this.state;

    let mainContent;

    switch (screen){
      case PREFERENCE_SCREEN_PANEL_ABOUT:
        mainContent = (<PreferenceAboutPanel
          onInstalledDetails={onInstalledDetails}
          uninstall={uninstall}
        />);
        break;
      case PREFERENCE_SCREEN_PANEL_CRITERIA:
        mainContent = (<PreferenceCriteriaPanel
          criteria={criteria}
          selectCriterion={selectCriterion}
          unselectCriterion={unselectCriterion}
          imagesUrl={imagesUrl}
        />);
        break;
      case PREFERENCE_SCREEN_PANEL_SOURCES:
        mainContent = (<PreferenceSourcesPanel
          editors={editors}
          excludeEditor={excludeEditor}
          includeEditor={includeEditor}
          imagesUrl={imagesUrl}
        />);
        break;
      default:
        console.error('Unknown content value', screen);
    }

    const changePanel = e => {
      const newContent = e.currentTarget.getAttribute('data-panel');
      this.setState(Object.assign(this.state, {screen: newContent}));
    };

    return (<section className="preference-panel">
      <nav>
        <ul>
          <li className="preference-menu-about">
            <button
              data-panel={PREFERENCE_SCREEN_PANEL_ABOUT}
              onClick={changePanel}
              className={'not-button with-image' +
                (screen === PREFERENCE_SCREEN_PANEL_ABOUT ? ' active' : '')}>
              <img role="presentation" className="lmem-controls-picto" src={imagesUrl + 'info.svg'} />
              <span>Général</span>
            </button>
          </li>
          <li className="preference-menu-criteria">
            <button
              data-panel={PREFERENCE_SCREEN_PANEL_CRITERIA}
              onClick={changePanel}
              className={'not-button with-image' +
              (screen === PREFERENCE_SCREEN_PANEL_CRITERIA ? ' active' : '')}>
              <img role="presentation" className="lmem-controls-picto" src={imagesUrl + 'valid.svg'} />
              <span>Critères de choix</span>
            </button>
          </li>
          <li className="preference-menu-sources">
            <button
              data-panel={PREFERENCE_SCREEN_PANEL_SOURCES}
              onClick={changePanel}
              className={'not-button with-image' +
              (screen === PREFERENCE_SCREEN_PANEL_SOURCES ? ' active' : '')}>
              <img role="presentation" className="lmem-controls-picto" src={imagesUrl + 'close.svg'} />
              <span>Sources d’information</span>
            </button>
          </li>
        </ul>
      </nav>
      <div className="separation-bar"></div>
      <main className={mainClassName(screen)}>
        {mainContent}
      </main>
    </section>);
  }
  
}
