import React from 'react';
import PropTypes from 'prop-types';
import { Truncated} from '../../../atoms';
import Container from './Container';

export const SourceURL = ({ numberOfCharacters, children, ...props }) => (
  <Container {...props} href={children}>
    <Truncated numberOfCharacters={numberOfCharacters} preserveWords={false}>
      {children}
    </Truncated>
  </Container>
);

SourceURL.propTypes = {
  numberOfCharacters: PropTypes.number,
  children: PropTypes.string.isRequired,
};

SourceURL.defaultProps = {
  numberOfCharacters: null,
};

export default SourceURL;