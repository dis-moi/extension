import React, { useState } from 'react';
import styled from 'styled-components';
import BackgroundButton from 'components/atoms/Button/BackgroundButton/BackgroundButton';
import Check from 'components/atoms/icons/CheckSmall';

const Container = styled.div`
  display: flex;

  & > * {
    max-width: 150px;
    margin-top: 6px;
    text-transform: none;
  }
`;

const Button = styled(BackgroundButton)`
  min-width: 150px;

  &,
  &:hover {
    color: ${({ bordered, theme }) => (bordered ? theme.primaryColor : '#fff')};
    background-color: ${({ bordered }) => (bordered ? '#fff' : '#062e65')};
    border-color: ${({ bordered, theme }) =>
      bordered ? theme.primaryColor : '#062e65'};
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
  const [hovered, setHovered] = useState(false);
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
      <Button
        onClick={handleSubscribe}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        loading={isLoading}
        bordered={!!subscribed}
      >
        {subscribed ? (
          hovered ? (
            'Se désabonner'
          ) : (
            <>
              <Check />
              &nbsp;Abonné
            </>
          )
        ) : (
          "S'abonner"
        )}
      </Button>
    </Container>
  );
};

export default ContributorButton;
