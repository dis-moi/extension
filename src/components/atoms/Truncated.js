import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import truncate from '../../app/utils/truncate';

const Truncated = ({ numberOfWords, children }) => (<Fragment>{truncate(children, numberOfWords)}</Fragment>);

Truncated.propTypes = {
  numberOfWords: PropTypes.number.isRequired,
  children: PropTypes.string,
};

Truncated.defaultProps = {
  children: ''
};

export default Truncated;
