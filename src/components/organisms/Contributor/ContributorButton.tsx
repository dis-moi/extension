import React from 'react';
import styled from 'styled-components';
import BackgroundButton from 'components/atoms/Button/BackgroundButton/BackgroundButton';
import BorderButton from 'components/atoms/Button/BorderButton/BorderButton';

const Container = styled.div`
  display: flex;

  & > * {
    flex-grow: 1;
    min-width: 100px;
    margin-top: 6px;
    text-transform: none;
  }
`;

interface Props {
  subscribed?: boolean;
  onSubscribe: () => void;
  onUnsubscribe: () => void;
}

const ContributorButton = ({
  subscribed,
  onSubscribe,
  onUnsubscribe
}: Props) => (
  <Container>
    {!subscribed && (
      <BackgroundButton onClick={onUnsubscribe}>Abonné</BackgroundButton>
    )}
    {subscribed && (
      <BorderButton onClick={onSubscribe}>S&apos;abonner</BorderButton>
    )}
  </Container>
);

export default ContributorButton;
