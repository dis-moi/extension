import React from 'react';
import PropTypes from 'prop-types';
import { SourceURLContainer } from '../atoms';

export const SourceURL = ({ children, ...props }) => (
  <SourceURLContainer {...props} href={children}>
    {children}
  </SourceURLContainer>
);

SourceURL.propTypes = {
  children: PropTypes.string.isRequired,
};

export default SourceURL;
