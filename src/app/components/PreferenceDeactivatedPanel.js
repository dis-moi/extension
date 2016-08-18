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
      deactivatedWebsites, onReactivateWebsite
    } = props;
    const { reactivatedWebsites } = state;

    const websitesDisplayedAsDeactivated = deactivatedWebsites.subtract(reactivatedWebsites);

    const websitesDisplayedAsDeactivatedArray = [...websitesDisplayedAsDeactivated]
    .map(w => ({ website: w, active: false }));
    
    const reactivatedWebsitesArray = [...reactivatedWebsites]
    .map(w => ({ website: w, active: true }));

    console.log('d, r', websitesDisplayedAsDeactivatedArray, reactivatedWebsitesArray);

    const displayedWebsites = websitesDisplayedAsDeactivatedArray.concat(reactivatedWebsitesArray);
    displayedWebsites.sort(({ website: w1 }, { website: w2 }) => w1.localeCompare(w2));

    const lis = displayedWebsites
        .map(({ website, active }) => <li key={website}>
            <span>{website}</span>
            <button onClick={active ?
                undefined :
                e => {
                  onReactivateWebsite(website);
                  this.setState(Object.assign({}, state, {
                    reactivatedWebsites: reactivatedWebsites.add(website)
                  }));
                }
            }>{
                active ? '✓' : 'Réactiver'
            }</button>
        </li>);

    return (<div>
        <ul>
            {lis}
        </ul>
    </div>);
  }

}

export default PreferenceDeactivatedPanel;
