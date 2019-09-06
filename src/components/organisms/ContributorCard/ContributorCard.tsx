import React from 'react';
import ContributorLarge from '../Contributor/ContributorLarge';
import Container from './Container';
import { Contributor } from 'app/lmem/contributor';

interface Props {
  contributor: Contributor;
}

export const ContributorNav = ({ contributor }: Props) => (
  <Container>
    <ContributorLarge
      contributor={contributor}
      onSubscribe={() => {}}
      onUnsubscribe={() => {}}
    />
  </Container>
);

export default ContributorNav;
