import React from 'react';
import { MemoryHistory } from 'history';
import { RouteComponentProps, withRouter } from 'react-router';
import { truncateButPreserveWords } from 'app/utils/truncate';
import { stripHtml } from 'app/utils/stripHtml';
import Container from './Container';
import LogoContainer from './LogoContainer';
import LogoImg from './LogoImg';
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
        <Title title={title}>
          {truncateButPreserveWords(stripHtml(title), 34)}
        </Title>
      ) : (
        <LogoContainer>
          <LogoImg />
        </LogoContainer>
      )}
      <CloseButton onClick={close} />
    </Container>
  );
};

export { NotificationHeader };

export default withRouter(NotificationHeader);
