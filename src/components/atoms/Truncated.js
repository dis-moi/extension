import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import truncate from '../../app/utils/truncate';

const Truncated = ({ numberOfCharacters, preserveWords, children }) => (
  <Fragment>{numberOfCharacters ? truncate(children, numberOfCharacters, preserveWords) : children}</Fragment>
);

Truncated.propTypes = {
  numberOfCharacters: PropTypes.number,
  children: PropTypes.string,
  preserveWords: PropTypes.bool,
};

Truncated.defaultProps = {
  numberOfCharacters: null,
  children: '',
  preserveWords: true,
};

export default Truncated;
