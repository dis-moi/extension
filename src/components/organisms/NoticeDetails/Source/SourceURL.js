import React from 'react';
import PropTypes from 'prop-types';
import Container from './Container';

export const SourceURL = ({ children, ...props }) => (
  <Container {...props} href={children}>
    {children}
  </Container>
);

SourceURL.propTypes = {
  children: PropTypes.string.isRequired,
};

export default SourceURL;
