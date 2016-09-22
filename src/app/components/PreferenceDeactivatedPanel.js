import React, { Component, PropTypes } from 'react';

import { Set as ImmutableSet } from 'immutable';


class PreferenceDeactivatedPanel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      reactivatedWebsites: new ImmutableSet()
    };
  }

  render() {
    const { props, state } = this;
    const {
      deactivatedWebsites, onReactivateWebsite, imagesUrl
    } = props;
    const { reactivatedWebsites } = state;

    const websitesDisplayedAsDeactivated = deactivatedWebsites.subtract(reactivatedWebsites);

    const websitesDisplayedAsDeactivatedArray = [...websitesDisplayedAsDeactivated]
    .map(w => ({ website: w, active: false }));
    
    const reactivatedWebsitesArray = [...reactivatedWebsites]
    .map(w => ({ website: w, active: true }));

    // console.log('d, r', websitesDisplayedAsDeactivatedArray, reactivatedWebsitesArray);

    const displayedWebsites = websitesDisplayedAsDeactivatedArray.concat(reactivatedWebsitesArray);
    displayedWebsites.sort(({ website: w1 }, { website: w2 }) => w1.localeCompare(w2));

    const lis = displayedWebsites
      .map(({ website, active }) => <li key={website} className={active ? 'reactivated' : undefined}>
        <span className="deactivated-website-title">
          <img
            role="presentation"
            src={'https://www.google.com/s2/favicons?domain=' + encodeURIComponent(website)} />
          {website.replace(/^www\./, '')}
        </span>
        <button
          disabled={active}
          onClick={active ?
            undefined :
            e => {
              onReactivateWebsite(website);
              this.setState(Object.assign({}, state, {
                reactivatedWebsites: reactivatedWebsites.add(website)
              }));
            }
          }>{active ? <img src={imagesUrl + 'valid.svg'} alt="Site réactivé" /> : 'Réactiver'}</button>
      </li>);

    return lis.length > 0 ?
      (<div>
        <ul>{lis}</ul>
        <div className="separation-bar"></div>
        <aside>
          <h1>Aide</h1>
          <p>
            Voici la liste des sites Web pour lesquels l’assistant ne se déclenche pas,
            c’est-à-dire ne cherche pas de guide, conseil ou alternative en rapport avec la page consultée.
          </p>
          <p>
            Pour <strong>réactiver</strong> un site précédemment désactivé&nbsp;:
            cliquez sur le bouton <i>réactiver</i> qui s’affiche à côté de chaque site de la liste.
          </p>
          <h2>Désactiver un site</h2>
          <p>
            Quand l’assistant s’affiche sur un site sur lequel vous ne souhaitez pas être
            accompagné-e, cliquez sur le bouton <i>
              <img alt="désactiver" src={imagesUrl + 'power.svg'} width="15" /></i> (en haut à droite
            de l’assistant).
          </p>
        </aside>
      </div>) :
      (<p><small>Aucun site n’est désactivé&nbsp;:<br />
        L’assistant vous accompagne partout pour vous trouver
        des recommandations susceptibles de vous intéresser.
      </small></p>);
  }

}

export default PreferenceDeactivatedPanel;
