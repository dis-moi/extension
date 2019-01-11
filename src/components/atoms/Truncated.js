import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import truncate from '../../app/utils/truncate';

const Truncated = ({ numberOfCharacters, preserveWords, children }) => (
  <Fragment>{truncate(children, numberOfCharacters, preserveWords)}</Fragment>
);

Truncated.propTypes = {
  numberOfCharacters: PropTypes.number.isRequired,
  children: PropTypes.string,
  preserveWords: PropTypes.bool,
};

Truncated.defaultProps = {
  children: '',
  preserveWords: true,
};

export default Truncated;
