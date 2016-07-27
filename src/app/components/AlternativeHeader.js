import React, { Component, PropTypes } from 'react';
import {
  DEACTIVATE_EVERYWHERE,
  DEACTIVATE_WEBSITE_ALWAYS,
  SESSION_DEACTIVATE_DELAY
} from '../constants/preferences';

class AlternativeHeader extends Component {

  constructor(props) {
    super(props);
    this.state = {
      deactivateMenuOpen: false
    };
  }

  render() {
    const { props, state } = this;
    const { imagesUrl, reduced, onExtend, onReduce, onDeactivate, togglePrefPanel } = props;
    const { deactivateMenuOpen } = state;

    const reduceButtonText = reduced ? 'Agrandir' : 'Réduire';
    const buttonButtonClassName = [
      'lmem-controls-picto',
      reduced ? 'lmem-controls-open' : 'lmem-controls-close'
    ].join(' ');
    const tooltipButtonClassName = [
      'tooltip',
      reduced ? 'tooltip-left' : 'tooltip-bottom-right'
    ].join(' ');

    const deactivateMenu = deactivateMenuOpen ? (
      <div className="menu-wrapper menu-bottom-right">
        <div className="menu-content">
          <ul className="menu-list">
            <li>
              <button className="not-button with-image" onClick={ e => onDeactivate({
                where: DEACTIVATE_EVERYWHERE,
                duration: SESSION_DEACTIVATE_DELAY
              }) }
                >
                <img
                  role="presentation"
                  className="lmem-controls-picto"
                  src={ imagesUrl + 'power-timer.svg' } />
                <span>Désactiver partout pour 30mins</span>
              </button>
            </li><li>
              <button className="not-button with-image" onClick={ e => onDeactivate({
                where: window.location && location.hostname,
                duration: DEACTIVATE_WEBSITE_ALWAYS
              }) }
                >
                <img
                  role="presentation"
                  className="lmem-controls-picto"
                  src={ imagesUrl + 'power-cross.svg' } />
                <span>Désactiver sur ce site pour toujours</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    ) : undefined;

    const deactivateButtonOnClick = reduced ?
      e => onDeactivate({
        where: DEACTIVATE_EVERYWHERE,
        duration: SESSION_DEACTIVATE_DELAY
      }) :
      e => {
        e.nativeEvent.stopImmediatePropagation();
        this.setState({ deactivateMenuOpen: !deactivateMenuOpen });
      };

    return (
      <header className="lmem-topbar fixed">
        <div className="lmem-topbar-notification">

          <div className="mainframe">
            <div className="mainframe-inner">
              <h1 className="lmem-topbar-title">
                <strong>{ 'Le Même en Mieux' }</strong>
              </h1>
            </div>
          </div>
        </div>

        <nav>
          <ul className="lmem-controls-list">
            <li className="with-menu">
              <div className="button-directive">
                <button className="button button-compact with-tooltip"
                  onClick={deactivateButtonOnClick}
                  >
                  <img role="presentation" src={ imagesUrl + 'power.svg' }
                    className="lmem-controls-picto"
                    />
                  <span className={tooltipButtonClassName}><span>
                    Désactiver
                  </span></span>
                </button>
              </div>
              <div className="menu-directive menu-deactivate" ref="deactivateMenu">
                { deactivateMenu }
              </div>
            </li>
            <li className="with-menu">
              <div className="button-directive">
                <button className="button button-compact with-tooltip"
                  onClick={togglePrefPanel}>
                  <img role="presentation" src={ imagesUrl + 'settings.svg' }
                    className="lmem-controls-picto" />
                  <span className={tooltipButtonClassName}><span>
                    Préférences
                  </span></span>
                </button>
              </div>
            </li>
          </ul>
        </nav>

        <div className="button-wrapper">
          <div className="button-directive">
            <button className="button button-compact with-image with-tooltip"
              onClick={this.onClick.bind(this) }
              >
              <img
                role="presentation"
                src={ imagesUrl + 'arrow.svg' }
                className={ buttonButtonClassName }
                />
              <span className="button-label">{reduceButtonText}</span>
              <span className={tooltipButtonClassName}><span>
                {reduceButtonText}
              </span></span>
            </button>
          </div>
        </div>

        <button className="lmem-topbar-logo with-tooltip not-button"
          onClick={this.onClick.bind(this) }
          >
          <img src={ imagesUrl + 'logo-lmem.svg' } alt="" />
          <span className="tooltip tooltip-right"><span>
            { reduceButtonText + ' le panneau comparatif' }
          </span></span>
        </button>
      </header>
    );
  }

  onClick() {
    return this.props.reduced ? this.props.onExtend() : this.props.onReduce();
  }

  componentDidMount() {
    this.watchForMenuExit();
  }

  componentWillUnmount() {
    this.refs.deactivateMenu.ownerDocument
      .removeEventListener('click', this._closeMenuDocumentClickHandler);
  }

  watchForMenuExit() {
    const menuElement = this.refs.deactivateMenu;

    this._closeMenuDocumentClickHandler = event => {
      if (!this.state.deactivateMenuOpen) return;

      if (!event.target.matches('.menu-deactivate, .menu-deactivate *')) {
        this.setState({ deactivateMenuOpen: false });
      }
    };

    menuElement.ownerDocument.addEventListener('click', this._closeMenuDocumentClickHandler);
  }


}

export default AlternativeHeader;
