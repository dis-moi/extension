import React from 'react';
import { MemoryHistory } from 'history';
import { RouteComponentProps, withRouter } from 'react-router';
import WrappedLogoDismoi from 'components/atoms/icons/LogoDismoi';
import Container from './Container';
import LogoContainer from './LogoContainer';
import BackButton from './BackButton';
import CloseButton from './CloseButton';
import Title from './Title';

interface OwnProps {
  title?: string;
  goBack?: () => void;
  close?: () => void;
}
type Props = OwnProps & RouteComponentProps;

const NotificationHeader = ({ title, goBack, close, history }: Props) => {
  const handleGoBack = goBack || history.goBack;

  return (
    <Container>
      {(history as MemoryHistory).index > 0 && (
        <BackButton onClick={handleGoBack} />
      )}
      {title ? (
        <Title>{title}</Title>
      ) : (
        <LogoContainer>
          <WrappedLogoDismoi />
        </LogoContainer>
      )}
      <CloseButton onClick={close} />
    </Container>
  );
};

export { NotificationHeader };

export default withRouter(NotificationHeader);
