import React from 'react';
import styled from 'styled-components';
import BackgroundButton from 'components/atoms/Button/BackgroundButton/BackgroundButton';
import BorderButton from 'components/atoms/Button/BorderButton/BorderButton';

const Container = styled.div`
  display: flex;

  & > * {
    max-width: 150px;
    margin-top: 6px;
    text-transform: none;
  }
`;

const ContributorBackgroundButton = styled(BackgroundButton)`
  &:hover {
    color: #fff;
    background-color: #062e65;
    border-color: #062e65;
  }
`;

const ContributorBorderButton = styled(BorderButton)`
  color: ${props => props.theme.primaryColor};
  border-color: ${props => props.theme.primaryColor};
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
    {subscribed && (
      <ContributorBorderButton onClick={onUnsubscribe}>
        Abonné
      </ContributorBorderButton>
    )}
    {!subscribed && (
      <ContributorBackgroundButton onClick={onSubscribe}>
        S&apos;abonner
      </ContributorBackgroundButton>
    )}
  </Container>
);

export default ContributorButton;
