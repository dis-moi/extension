import React from 'react';
import styled from 'styled-components';

const Description = styled.p`
  margin-top: 20px;
  margin-bottom: 0;
  font-size: 15px;
`;

const PlaceholderDescription = styled(Description)`
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
    <Description>{children}</Description>
  ) : (
    <PlaceholderDescription>
      Cet utilisateur n’a pas encore ajouté une description.
    </PlaceholderDescription>
  );

export default ContributorDescription;
