import React, { Component, PropTypes } from 'react';

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
          className="button-hollow with-tooltip with-image"
          onClick={ e => dismissReco(recoId) }>
          <img src={ imagesUrl + 'close.svg' } role="presentation" />
          <span className="tooltip tooltip-left">
            Ignorer (ne plus afficher)
          </span>
        </button>
        <button
          className="button-hollow with-tooltip with-image"
          onClick={ this.handleApproveClick }>
          <img
            src={ imagesUrl + (isApproved ? 'love-pink.svg' : 'love.svg') }
            role="presentation" />
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
        </button>*/}
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
