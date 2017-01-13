import React, { Component, PropTypes } from 'react';
import {
  DEACTIVATE_EVERYWHERE,
  SESSION_DEACTIVATE_DELAY
} from '../constants/websites';
import {
  PREFERENCE_SCREEN_PANEL_ABOUT,
  HEADER_CONTENT
} from '../constants/ui';

class RecoHeader extends Component {

  constructor(props) {
    super(props);

    this.handleDeactivateButtonClick = this.handleDeactivateButtonClick.bind(this);
    this.handleReduceButtonClick = this.handleReduceButtonClick.bind(this);
    this.handleOpenPrefButtonClick = this.handleOpenPrefButtonClick.bind(this);
  }

  handleDeactivateButtonClick() {
    const { onDeactivate } = this.props;
    onDeactivate({
      where: DEACTIVATE_EVERYWHERE,
      duration: SESSION_DEACTIVATE_DELAY,
    });
  }

  handleReduceButtonClick() {
    const { reduced, onExtend, onReduce } = this.props;
    if (reduced) onExtend();
    else onReduce();
  }

  handleOpenPrefButtonClick() {
    const { reduced, onExtend, openPrefScreen } = this.props;
    if (reduced) onExtend();
    openPrefScreen(PREFERENCE_SCREEN_PANEL_ABOUT);
  }

  render() {
    const {
      imagesUrl, reduced, preferenceScreenPanel,
       closePrefScreen
    } = this.props;

    const reduceButtonText = reduced ? 'Agrandir' : 'Réduire';
    const buttonButtonClassName = [
      'lmem-controls-picto',
      reduced ? 'lmem-controls-open' : 'lmem-controls-close'
    ].join(' ');
    const tooltipButtonClassName = [
      'tooltip',
      reduced ? 'tooltip-left' : 'tooltip-bottom-right'
    ].join(' ');

    const headerButtons = preferenceScreenPanel ?
      (<li>
        <div className="button-directive">
          <button
            className="button button-compact with-tooltip"
            onClick={closePrefScreen}>
            <img
              role="presentation"
              src={ imagesUrl + 'close.svg' }
              className="lmem-controls-picto" />
            <span className={tooltipButtonClassName}><span>
              Fermer l’écran des préférences
            </span></span>
          </button>
        </div>
      </li>) :
      [(<li key="preferences">
        <div className="button-directive">
          <button
            className="button button-compact with-tooltip"
            onClick={ this.handleOpenPrefButtonClick }>
            <img
              role="presentation"
              src={ imagesUrl + 'settings.svg' }
              className="lmem-controls-picto" />
            <span className={tooltipButtonClassName}><span>
              Préférences
            </span></span>
          </button>
        </div>
      </li>),
      (<li key="deactivate">
        <div className="button-directive">
          <button
            className="button button-compact with-tooltip"
            onClick={ this.handleDeactivateButtonClick }>
            <img
              role="presentation"
              src={ imagesUrl + 'power.svg' }
              className="lmem-controls-picto" />
            <span className={tooltipButtonClassName}><span>
              { 'Désactiver une heure' }
            </span></span>
          </button>
        </div>
      </li>),
      (<li key="reduce-extend-button">
        <button
          className="reduce button-compact with-image with-tooltip"
          onClick={ this.handleReduceButtonClick }>
          <img
            role="presentation"
            src={ imagesUrl + 'arrow.svg' }
            className={ buttonButtonClassName }
          />
          <span className="button-label">{reduceButtonText}</span>
          <span className={tooltipButtonClassName}>
            {reduceButtonText}
          </span>
        </button>
      </li>)];

    const extendReduceButton = preferenceScreenPanel ? undefined :
    (<div className="button-wrapper">
      <div className="button-directive">
        <button
          className="button button-compact with-image with-tooltip"
          onClick={ this.handleReduceButtonClick }>
          <img
            role="presentation"
            src={ imagesUrl + 'arrow.svg' }
            className={ buttonButtonClassName } />
          <span className="button-label">{reduceButtonText}</span>
          <span className={tooltipButtonClassName}><span>
            {reduceButtonText}
          </span></span>
        </button>
      </div>
    </div>);

    const headerContent = preferenceScreenPanel ?
      HEADER_CONTENT[preferenceScreenPanel](imagesUrl) :
      HEADER_CONTENT.default;

    return (
      <header>
        <button
          className="with-tooltip logo"
          onClick={ this.handleReduceButtonClick }>
          <img width="45" src={ imagesUrl + 'logo-lmem.svg' } alt="" />
          <span className="tooltip tooltip-right">
            { reduceButtonText + ' le panneau comparatif' }
          </span>
        </button>

        <div className="separation-bar" />

        <h1 className="lmem-topbar-title">
          {headerContent}
        </h1>

        
        <ul className="lmem-controls-list">
          {headerButtons}
        </ul>

        
      </header>
    );
  }

}

export default RecoHeader;
