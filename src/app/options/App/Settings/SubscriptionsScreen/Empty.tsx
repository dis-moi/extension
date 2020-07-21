import React from 'react';
import styled from 'styled-components';
import BackgroundButton from 'components/atoms/Button/BackgroundButton/BackgroundButton';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #66696a;
`;

const EmptyTitle = styled.h1`
  margin: 0 0 3px;
  font-size: 24px;
`;

const EmptyText = styled.p`
  margin: 0 0 20px;
  font-size: 18px;
  text-align: center;
`;

const EmptyButton = styled(BackgroundButton)`
  height: auto;
  padding: 10px 25px;
  font-size: 20px;
  text-transform: uppercase;
`;

interface Props {
  goToSuggestions: () => void;
}

const Empty = ({ goToSuggestions }: Props) => (
  <Wrapper>
    <EmptyTitle>Aucun abonnement.</EmptyTitle>

    <EmptyText>
      Veuillez suivre des informateur(trice)s dans la
      <br /> partie “Suggestions”
    </EmptyText>

    <EmptyButton onClick={goToSuggestions}>
      Choisir mes informateur(ice)s
    </EmptyButton>
  </Wrapper>
);

export default Empty;
