import React, { ReactNode } from 'react';
import NotificationContainer from './Container';
import NotificationHeader from './NotificationHeader';
import Main from './Main';
import NotificationFooter from './NotificationFooter';
import ScreenProps from '../../../app/content/ScreenProps';

interface OwnProps {
  title?: string;
  close?: () => void;
  onBack?: () => void;
  closed?: boolean;
  hasNotices?: boolean;
  children?: ReactNode;
}

type NotificationProps = OwnProps & ScreenProps;

const Notification = ({
  title,
  close,
  onBack,
  closed,
  hasNotices,
  children
}: NotificationProps) =>
  closed ? null : (
    <NotificationContainer hasNotices={hasNotices}>
      <NotificationHeader title={title} close={close} goBack={onBack} />
      <Main hasNotices={hasNotices}>{children}</Main>
      <NotificationFooter />
    </NotificationContainer>
  );

export default Notification;
