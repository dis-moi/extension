import React from 'react';
import styled from 'styled-components';
import ContributorLarge from '../Contributor/ContributorLarge';
import { Contributor } from '../../../app/lmem/contributor';

const Container = styled.article`
  padding: 10px 15px;
  background-color: #fff;
  border: 1px solid #dedede;
  border-radius: 8px;
`;

interface Props {
  contributor: Contributor;
}

export const ContributorNav = ({ contributor }: Props) => (
  <Container>
    <ContributorLarge contributor={contributor} />
  </Container>
);

export default ContributorNav;
