import React, { Component, PropTypes } from 'react';
import { Map } from 'immutable';
import { EXTENSION_VERSION } from '../../constants/ui';

import Modal from './Modal';

function formatLocaleDate(strDate) {
  const dateOfInstall = new Date(strDate);

  if (Number.isNaN(dateOfInstall.getTime()))
    return undefined;

  return dateOfInstall.toLocaleDateString(navigator.language,
    { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

export default class PreferenceAboutPanel extends Component {

  constructor(props) {
    super(props);

    this.state = {
      confirmUninstall: false,
      modalTransition: false,
    };

    this.handleUninstallClick = this.handleUninstallClick.bind(this);
    this.handleCancelUninstallClick = this.handleCancelUninstallClick.bind(this);
    this.handleConfirmUninstallClick = this.handleConfirmUninstallClick.bind(this);
  }

  handleUninstallClick() {
    this.setState({ confirmUninstall: true });
  }

  handleCancelUninstallClick() {
    this.setState({ confirmUninstall: false });
  }

  handleConfirmUninstallClick() {
    this.props.uninstall();
  }

  get confirmUninstall() {
    return (
      <Modal>
        <h1>L’extension Le Même en Mieux va être désinstallée de votre ordinateur...</h1>
        <div className="modal-buttons-wrapper">
          <button
            className="button-cancel button-hollow"
            onClick={ this.handleCancelUninstallClick }>
            Annuler
          </button>
          <button
            className="button-confirm"
            onClick={ this.handleConfirmUninstallClick }>
            Désinstaller
          </button>
        </div>
      </Modal>
    );
  }

  render() {
    const { confirmUninstall } = this.state;
    const { onInstalledDetails } = this.props;
    const ISODateOfInstall = Map.isMap(onInstalledDetails) && onInstalledDetails.get('datetime');
    const localeDateOfInstall = ISODateOfInstall && formatLocaleDate(ISODateOfInstall);

    return (
      <div>
        <section>
          <h1>
            <span>Le Même en Mieux est un assistant d’achat indépendant des vendeurs et des marques</span>
            { localeDateOfInstall ?
              <span> que vous avez installé le <time dateTime={ISODateOfInstall}>{localeDateOfInstall}</time></span> :
              '' }.
          </h1>

          {/* <h2>Localisation</h2>*/}
          {/* <p>*/}
          {/* Si possible, l’extension filtre les recommandations pertinentes pour votre localité&nbsp;:&nbsp;*/}
          {/* <button className="not-button">33 600 PESSAC (changer)</button>.*/}
          {/* </p>*/}
        </section>
        <aside>
          <p>Le Même en Mieux est un service indépendant des sites Web consultés.</p>
          <ul>
            <li><a target="_blank" href="https://choisir.lmem.net/questions-frequentes-aide/">Aide</a></li>
            <li><a target="_blank" href="https://www.lmem.net/contact.html">Contact</a></li>
            <li><a
              target="_blank"
              href="https://choisir.lmem.net/charte-de-respect-de-la-vie-privee-5-regles-dor/">
              Vie privée
            </a></li>
            <li><a target="_blank" href="https://www.lmem.net/cgu.html">CGU</a></li>
            <li>v{EXTENSION_VERSION}</li>
          </ul>
        </aside>
        <footer>
          <p className="button-directive">
            <button
              className="button"
              onClick={ this.handleUninstallClick }>
              Désinstaller l’extension
            </button>
          </p>
          { confirmUninstall ? this.confirmUninstall : undefined }
        </footer>
      </div>
    );
  }
}
