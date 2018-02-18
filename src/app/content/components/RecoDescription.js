import React, { PropTypes } from 'react';
import { sanitize } from 'dompurify';

// FIXME This might be a backend thing...
function addHtmlLinks(html) {
  return html.replace(
    /(https?:\/\/)?([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?/gi,
    (match, protocol) =>
      `<a
        target="_blank"
        rel="noopener noreferrer"
        href="${!protocol && 'https://'}${match}?utm_source=lmem_assistant">
          ${match}
      </a>`
  );
}

function sanitizeHtml(rawHtml) {
  return {
    __html: addHtmlLinks(sanitize(rawHtml, {
      ALLOWED_TAGS: ['p'],
      ALLOWED_ATTR: [],
    })),
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