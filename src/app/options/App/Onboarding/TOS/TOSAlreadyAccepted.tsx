import React from 'react';
import styled from 'styled-components';
import { ExternalLink } from 'components/atoms';
import TOSText from './TOSText';

const Text = styled(TOSText)`
  font-size: 16px;
  text-align: center;

  a {
    color: ${props => props.theme.activeColor};
  }
`;

const TOSAlreadyAccepted = () => (
  <Text>
    Vous avez accepté les{' '}
    <ExternalLink href="https://www.bulles.fr/cgu">
      conditions générales d&apos;utilisation (CGU)
    </ExternalLink>
  </Text>
);

export default TOSAlreadyAccepted;
