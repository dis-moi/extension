import React, { PropTypes } from 'react';

export default function FeedbackButtons({ imagesUrl, recoId, dismissReco, approveReco, reportReco }) {
  return (
    <div>
      <button
        className="button-hollow with-tooltip with-image"
        onClick={ e => dismissReco(recoId) }>
        <img src={ imagesUrl + 'close.svg' } role="presentation" />
        <span className="button-label">Ignorer</span>
        <span className="tooltip tooltip-left">
          Ne plus afficher
        </span>
      </button>
      <button
        className="button-hollow with-tooltip with-image"
        onClick={ e => approveReco(recoId) }>
        <img src={ imagesUrl + 'love.svg' } role="presentation" />
        <span className="button-label">Approuver</span>
      </button>

      <div className="separation" role="presentation" />

      <button
        className="button-hollow with-tooltip with-image"
        onClick={ e => reportReco(recoId) }>
        <img src={ imagesUrl + 'report.svg' } role="presentation" />
        <span className="button-label">Signaler</span>
      </button>
    </div>
  );
}

FeedbackButtons.propTypes = {
  imagesUrl: PropTypes.string.isRequired,
  recoId: PropTypes.number.isRequired,
  dismissReco: PropTypes.func.isRequired,
  approveReco: PropTypes.func.isRequired,
  reportReco: PropTypes.func.isRequired,
};
