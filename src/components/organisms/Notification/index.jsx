import React from 'react';
import ContentTitleTop from './ContentTitleTop';
import NotificationContainer from './Container';
import NotificationHeader from './NotificationHeader';
import NotificationFooter from './NotificationFooter';
import Main from './Main';

export const Notification = ({
  title, contentTitle, close, onBack, closed, hasNotices, children
}) => (
  closed
    ? null
    : (
      <NotificationContainer>
        <NotificationHeader title={title} close={close} goBack={onBack} />
        <Main hasNotices={hasNotices}>
          <ContentTitleTop>{contentTitle}</ContentTitleTop>
          {children}
        </Main>
        <NotificationFooter />
      </NotificationContainer>
    )
);

export default Notification;
