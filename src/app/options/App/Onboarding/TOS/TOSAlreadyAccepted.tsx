import React from 'react';
import styled from 'styled-components';
import { ExternalLink } from 'components/atoms';
import TOSText from './TOSText';
import { WEBSITE_DOMAIN } from 'app/lmem';

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
    <ExternalLink href={`https://${WEBSITE_DOMAIN}/cgu`}>
      conditions générales d&apos;utilisation (CGU)
    </ExternalLink>
  </Text>
);

export default TOSAlreadyAccepted;
