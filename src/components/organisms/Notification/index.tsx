import React, { ReactNode } from 'react';
import { NewsState } from 'app/content/store/reducers/news.reducer';
import NotificationContainer from './Container';
import NotificationHeader from './NotificationHeader';
import Main from './Main';
import NotificationFooter from './NotificationFooter';
import NotificationNews from './NotificationNews';

interface NotificationProps {
  title?: string;
  close?: () => void;
  onBack?: () => void;
  closed?: boolean;
  hasNotices?: boolean;
  children?: ReactNode;
  news?: NewsState['message'];
}

const Notification = ({
  title,
  close,
  onBack,
  closed,
  hasNotices,
  children,
  news
}: NotificationProps) =>
  closed ? null : (
    <NotificationContainer hasNotices={hasNotices}>
      <NotificationHeader title={title} close={close} goBack={onBack} />
      <NotificationNews news={news} />
      <Main hasNotices={hasNotices}>{children}</Main>
      <NotificationFooter />
    </NotificationContainer>
  );

export default Notification;
