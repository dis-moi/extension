import React from 'react';
import styled, { css } from 'styled-components';

const Container = styled.p`
  margin-top: 20px;
  margin-bottom: 0;
  font-size: 15px;
`;

const PlaceholderContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

interface Props {
  children: string;
}
const ContributorDescription = ({ children }: Props) =>
  children ? (
    <Container>{children}</Container>
  ) : (
    <PlaceholderContainer>
      Cet utilisateur n’a pas encore ajouté une description.
    </PlaceholderContainer>
  );

export default ContributorDescription;
