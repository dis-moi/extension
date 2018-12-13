import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class FeedbackButtons extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isApproved: props.isApproved,
    };

    this.handleApproveClick = this.handleApproveClick.bind(this);
  }

  handleApproveClick() {
    const { isApproved } = this.state;
    const {
      approveReco,
      unapproveReco,
      recoId,
    } = this.props;

    if (isApproved) unapproveReco(recoId);
    else approveReco(recoId);

    this.setState({ isApproved: !isApproved });
  }

  render() {
    const { isApproved } = this.state;
    const {
      imagesUrl,
      recoId,
      dismissReco,
      reportReco
    } = this.props;

    return (
      <div>
        <button
          type="button"
          className="button-hollow with-tooltip with-image"
          onClick={ e => dismissReco(recoId) }>
          <img alt="" src={ imagesUrl + 'trashbin.svg' } />
          <span className="tooltip tooltip-left">
            Ne plus afficher
          </span>
        </button>
        <button
          type="button"
          className="button-hollow with-tooltip with-image"
          onClick={ this.handleApproveClick }>
          <img
            alt=""
            src={ imagesUrl + (isApproved ? 'love-pink.svg' : 'love.svg') }
          />
          <span className="tooltip tooltip-left">
            { isApproved ? 'J’approuve cette recommandation' : 'Approuver cette recommandation' }
          </span>
        </button>

        <div className="separation" role="presentation" />

        {/* <button
          className="button-hollow with-tooltip with-image"
          onClick={ e => reportReco(recoId) }>
          <img src={ imagesUrl + 'report.svg' } role="presentation" />
          <span className="tooltip tooltip-left">
            Signaler (erreur, propos haineux ou racistes...)
          </span>
        </button> */}
      </div>
    );
  }
}

FeedbackButtons.propTypes = {
  imagesUrl: PropTypes.string.isRequired,
  recoId: PropTypes.number.isRequired,
  isApproved: PropTypes.bool,
  dismissReco: PropTypes.func.isRequired,
  approveReco: PropTypes.func.isRequired,
  unapproveReco: PropTypes.func.isRequired,
  reportReco: PropTypes.func.isRequired,
};

FeedbackButtons.defaultProps = {
  isApproved: false,
};
