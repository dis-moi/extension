import React, { Component, PropTypes } from 'react';
import { 
  DEACTIVATE_EVERYWHERE, 
  DEACTIVATE_WEBSITE_ALWAYS, 
  SESSION_DEACTIVATE_DELAY 
} from '../constants/preferences';
import { Set as ImmutableSet } from 'immutable';

const CONTENT_ABOUT = 'CONTENT_ABOUT';
const CONTENT_DEACTIVATED_WEBSITES = 'CONTENT_DEACTIVATED_WEBSITES';

class AlternativeHeader extends Component {

  constructor(props) {
    super(props);
    this.state = {
      content: CONTENT_ABOUT,
      reactivatedWebsites: new ImmutableSet()
    };
  }

  render() {
    const { props, state } = this;
    const { deactivatedWebsites, onReactivateWebsite } = props;
    const { content, reactivatedWebsites } = state;

    let mainContent;

    const deactivatedWebsitesArray = [...deactivatedWebsites];

    const options = deactivatedWebsitesArray
        .map(s => <option value={s} key={s} />);


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

    switch (content){
      case CONTENT_ABOUT:
        mainContent = 'Le Même En Mieux vous recommande des alternatives pertinentes, blablabla';
        break;
      case CONTENT_DEACTIVATED_WEBSITES:
        mainContent = (
                    <div>
                        <ul>
                            {lis}
                        </ul>
                    </div>
                );
        break;
      default:
        console.error('Unknown content value', content);
    }

    const changeContent = e => {
      const newContent = e.target.getAttribute('data-content');
      this.setState(Object.assign({}, state, { content: newContent }));
    };

    return (<section className="preference-panel wrapperframe">
            <nav>
                <button data-content={CONTENT_ABOUT} onClick={changeContent}>A propos</button>
                <button data-content={CONTENT_DEACTIVATED_WEBSITES} onClick={changeContent}>
                Sites désactivés
                </button>
            </nav>
            <main>
                {mainContent}
            </main>
        </section>);
  }

}

export default AlternativeHeader;
