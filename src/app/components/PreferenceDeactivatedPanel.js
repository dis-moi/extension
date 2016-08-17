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

    const deactivatedWebsitesArray = [...deactivatedWebsites];

    const lis = deactivatedWebsitesArray
        .map(s => <li key={s}>
            <span>{s}</span>
            <button onClick={reactivatedWebsites.has(s) ?
                undefined :
                e => {
                  onReactivateWebsite(s);
                  this.setState(Object.assign({}, state, {
                    reactivatedWebsites: reactivatedWebsites.add(s)
                  }));
                }
            }>{
                reactivatedWebsites.has(s) ? '✓' : 'Réactiver'
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
