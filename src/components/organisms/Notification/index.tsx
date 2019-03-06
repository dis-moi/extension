import React, { ReactNode } from "react";
import ContentTitleTop from "./ContentTitleTop";
import NotificationContainer from "./Container";
import NotificationHeader from "./NotificationHeader";
import NotificationFooter from "./NotificationFooter";
import Main from "./Main";

interface Props {
  title?: string;
  contentTitle?: string;
  close?: () => void;
  onBack?: () => void;
  closed?: boolean;
  hasNotices?: boolean;
  children?: ReactNode;
}

export const Notification = ({
  title,
  contentTitle,
  close,
  onBack,
  closed,
  hasNotices,
  children
}: Props) =>
  closed ? null : (
    <NotificationContainer>
      <NotificationHeader title={title} close={close} goBack={onBack} />
      <Main hasNotices={hasNotices}>
        <ContentTitleTop>{contentTitle}</ContentTitleTop>
        {children}
      </Main>
      <NotificationFooter />
    </NotificationContainer>
  );

export default Notification;
