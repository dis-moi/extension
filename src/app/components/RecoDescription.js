import React, { PropTypes } from 'react';
import { sanitize } from 'dompurify';

function sanitizeHtml(rawHtml) {
  return {
    __html: sanitize(rawHtml, {
      ALLOWED_TAGS: ['p'],
      ALLOWED_ATTR: [],
    }),
  };
}

const RecoDescription = ({ description }) => (
  <div
    className="reco-summary-description summary-description"
    dangerouslySetInnerHTML={sanitizeHtml(description)} />
);

RecoDescription.PropTypes = {
  description: PropTypes.string.isRequired,
};

export default RecoDescription;