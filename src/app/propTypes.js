import PropTypes from 'prop-types';

export const criteria = {
  label: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
};

export const resource = {
  author: PropTypes.string,
  editor: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export const alternative = {
  label: PropTypes.string.isRequired,
  url_to_redirect: PropTypes.string.isRequired,
};

export const recommendation = {
  id: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  contributor: PropTypes.object.isRequired,
  criteria: PropTypes.arrayOf(PropTypes.shape(criteria)),
  isApproved: PropTypes.bool,
  resource: PropTypes.shape(resource),
  alternatives: PropTypes.arrayOf(PropTypes.shape(alternative)),
};
