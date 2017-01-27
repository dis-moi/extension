import React, { PropTypes } from 'react';

import {
  CRITERIA_TYPE_GO,
  CRITERIA_TYPE_NOGO,
  CRITERIA_TYPE_WARNING,
} from '../../lmem/typeOfCriteria';


function imgFilename(recommendationType) {
  switch (recommendationType) {
    case CRITERIA_TYPE_GO:
      return 'like.svg';
    case CRITERIA_TYPE_NOGO:
      return 'dislike.svg';
    case CRITERIA_TYPE_WARNING:
      return 'warning.svg';

    default:
      throw new ReferenceError('Recommendation type is undefined');
  }
}

function imgAlt(recommendationType) {
  switch (recommendationType) {
    case CRITERIA_TYPE_GO:
      return 'Vous êtes sur une page recommandée.';
    case CRITERIA_TYPE_NOGO:
      return 'Cette page ou ce produit vous est déconseillé.';
    case CRITERIA_TYPE_WARNING:
      return 'Attention : risque d’arnaque, biais, fausses informations...';

    default:
      throw new ReferenceError('Recommendation type is undefined');
  }
}

function className(recommendationType) {
  switch (recommendationType) {
    case CRITERIA_TYPE_GO:
      return 'reco-type-indicator-go';
    case CRITERIA_TYPE_NOGO:
      return 'reco-type-indicator-nogo';
    case CRITERIA_TYPE_WARNING:
      return 'reco-type-indicator-warning';

    default:
      throw new ReferenceError('Recommendation type is undefined');
  }
}


export default function TypeIndicator({ recommendationType, imagesUrl }) {
  return (
    <div className={'reco-type-indicator ' + className(recommendationType)}>
      <img
        src={ imagesUrl + imgFilename(recommendationType) }
        alt={ imgAlt(recommendationType) } />
    </div>
  );
}

TypeIndicator.PropTypes = {
  recommendationType: PropTypes.string.isRequired,
  imagesUrl: PropTypes.string.isRequired,
};
