import React from 'react';
import PropTypes from 'prop-types';
import formatLocaleDate from '../../app/utils/formatLocaleDate';

const Time = ({ children, ...props }) => (<time dateTime={children} {...props}>{formatLocaleDate(children)}</time>);

Time.propTypes = {
  children: PropTypes.string,
};

Time.defaultProps = {
  children: null,
};

export default Time;