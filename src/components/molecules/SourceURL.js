import React from 'react';
import PropTypes from 'prop-types';
import { SourceURLContainer, Truncated} from '../atoms';

export const SourceURL = ({ numberOfCharacters, children, ...props }) => (
  <SourceURLContainer {...props} href={children}>
    <Truncated numberOfCharacters={numberOfCharacters} preserveWords={false}>
      {children}
    </Truncated>
  </SourceURLContainer>
);

SourceURL.propTypes = {
  numberOfCharacters: PropTypes.number,
  children: PropTypes.string.isRequired,
};

SourceURL.defaultProps = {
  numberOfCharacters: null,
};

export default SourceURL;