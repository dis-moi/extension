import React from 'react';
import styled from 'styled-components';
import ContributorLarge from '../Contributor/ContributorLarge';

const Container = styled.article`
  padding: 10px 15px;
  background-color: #fff;
  border: 1px solid #dedede;
  border-radius: 8px;
`;

export const ContributorNav = () => (
  <Container>
    <ContributorLarge />
  </Container>
);

export default ContributorNav;
