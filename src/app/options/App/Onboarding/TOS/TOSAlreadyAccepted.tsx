import React from 'react';
import { ExternalLink } from 'components/atoms';
import TOSText from './TOSText';

const TOSAlreadyAccepted = () => (
  <TOSText>
    Vous avez accepté les{' '}
    <ExternalLink href="https://www.bulles.fr/cgu">
      conditions générales d&apos;utilisation (CGU)
    </ExternalLink>
  </TOSText>
);

export default TOSAlreadyAccepted;
