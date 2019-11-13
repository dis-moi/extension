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
    background-color: #fff;
    border-color: ${props => props.theme.primaryColor};
    min-width: 150px;
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
}: Props) => {
  const [subscribedButtonHovered, setSubscribedButtonHovered] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const handleSubscribe = () => {
    setLoading(true);
    const timer = setTimeout(() => {
      if (subscribed) {
        onUnsubscribe();
      } else {
        onSubscribe();
      }
      setLoading(false);
      clearTimeout(timer);
    }, 600);
  };

  return (
    <Container>
      {subscribed && (
        <ContributorBorderButton
          onClick={handleSubscribe}
          onPointerEnter={() => setSubscribedButtonHovered(true)}
          onPointerLeave={() => setSubscribedButtonHovered(false)}
          loading={isLoading}
        >
          {subscribedButtonHovered ? (
            'Se désabonner'
          ) : (
            <>
              <Check />
              &nbsp;Abonné
            </>
          )}
        </ContributorBorderButton>
      )}
      {!subscribed && (
        <ContributorBackgroundButton
          onClick={handleSubscribe}
          loading={isLoading}
        >
          S&apos;abonner
        </ContributorBackgroundButton>
      )}
    </Container>
  );
};

export default ContributorButton;
