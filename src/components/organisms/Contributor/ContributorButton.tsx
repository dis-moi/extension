import React, { useState } from 'react';
import styled from 'styled-components';
import BackgroundButton from 'components/atoms/Button/BackgroundButton/BackgroundButton';
import BorderButton from 'components/atoms/Button/BorderButton/BorderButton';
import Check from 'components/atoms/icons/CheckSmall';

const Container = styled.div`
  display: flex;

  & > * {
    max-width: 150px;
    margin-top: 6px;
    text-transform: none;
  }
`;

const ContributorBackgroundButton = styled(BackgroundButton)`
  min-width: 150px;
  text-transform: none;

  &:hover {
    color: #fff;
    background-color: #062e65;
    border-color: #062e65;
  }
`;

const ContributorBorderButton = styled(BorderButton)`
  &,
  &:hover {
    color: ${props => props.theme.primaryColor};
    text-transform: none;
    background-color: #fff;
    border-color: ${props => props.theme.primaryColor};
    min-width: 150px;
  }
`;

interface Props {
  subscribed?: boolean;
  onSubscribe: () => void;
  onUnsubscribe: () => void;
  loading?: boolean;
}

const ContributorButton = ({
  subscribed,
  onSubscribe,
  onUnsubscribe,
  loading
}: Props) => {
  const [subscribedButtonHovered, setSubscribedButtonHovered] = useState(false);

  return (
    <Container>
      {subscribed && (
        <ContributorBorderButton
          loading={loading}
          onClick={onUnsubscribe}
          onPointerEnter={() => setSubscribedButtonHovered(true)}
          onPointerLeave={() => setSubscribedButtonHovered(false)}
        >
          {subscribedButtonHovered ? (
            'Ne plus suivre'
          ) : (
            <>
              <Check />
              &nbsp;Abonné(e)
            </>
          )}
        </ContributorBorderButton>
      )}
      {!subscribed && (
        <ContributorBackgroundButton onClick={onSubscribe}>
          Suivre
        </ContributorBackgroundButton>
      )}
    </Container>
  );
};

export default ContributorButton;
