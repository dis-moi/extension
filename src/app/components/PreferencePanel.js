import React, { Component, PropTypes } from 'react';
import { 
  DEACTIVATE_EVERYWHERE, 
  DEACTIVATE_WEBSITE_ALWAYS, 
  SESSION_DEACTIVATE_DELAY 
} from '../constants/preferences';

const CONTENT_ABOUT = 'CONTENT_ABOUT';
const CONTENT_DEACTIVATED_WEBSITES = 'CONTENT_DEACTIVATED_WEBSITES';

class AlternativeHeader extends Component {

  constructor(props) {
    super(props);
    this.state = {
      content: CONTENT_ABOUT
    };
  }

  render() {
    const { props, state } = this;
        // const {imagesUrl, reduced, onExtend, onReduce, onDeactivate, togglePrefPanel} = props;
    const { content } = state;

    let mainContent;

    switch (content){
      case CONTENT_ABOUT:
        mainContent = 'Le Même En Mieux vous recommande des alternatives pertinentes, blablabla';
        break;
      case CONTENT_DEACTIVATED_WEBSITES:
        mainContent = (
                    'Les sites désactivés !'
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
