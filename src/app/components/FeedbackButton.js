import React, { Component, PropTypes } from 'react';

const FeedbackButton = ({ recoId, text, job }) => {

  return (
    <li>
      <div className="button-directive">
        <button
          className="button button-compact with-tooltip"
          onClick={e => {
            job(recoId);
          }}>
          <span><span>{text}</span></span>
        </button>
      </div>
    </li>
  );
};

FeedbackButton.propTypes = {
  recoID: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  job: PropTypes.func.isRequired
};

export default FeedbackButton;
