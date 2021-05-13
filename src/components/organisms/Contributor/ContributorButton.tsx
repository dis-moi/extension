import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import BackgroundButton from 'components/atoms/Button/BackgroundButton/BackgroundButton';
import BorderButton from 'components/atoms/Button/BorderButton/BorderButton';
import Check from 'components/atoms/icons/CheckSmall';

const Container = styled.div`
  display: flex;

  & > * {
    max-width: 150px;
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
  onSubscribe?: () => void;
  onUnsubscribe?: () => void;
  loading?: boolean;
}

const ContributorButton = ({
  subscribed,
  onSubscribe,
  onUnsubscribe,
  loading
}: Props) => {
  const [subscribedButtonHovered, setSubscribedButtonHovered] = useState(false);
  const { t } = useTranslation();
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
            t('profiles:action.stop_following')
          ) : (
            <>
              <Check />
              &nbsp;{t('profiles:common.subscriber')}
            </>
          )}
        </ContributorBorderButton>
      )}
      {!subscribed && (
        <ContributorBackgroundButton onClick={onSubscribe}>
          {t('profiles:action.follow')}
        </ContributorBackgroundButton>
      )}
    </Container>
  );
};

export default ContributorButton;
