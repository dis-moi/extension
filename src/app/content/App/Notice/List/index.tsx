import React from 'react';
import Notification from 'components/organisms/Notification';
import NoticeItem from 'components/organisms/Notice/Notice';
import AddNotice from 'components/molecules/AddNotice';
import { findType } from 'app/lmem/noticeType';
import NoNotice from './NoNotice';
import withConnect from './withConnect';
import { EnhancedNotice } from '../../../../lmem/notice';

export interface Props {
  notices: EnhancedNotice[];
  dismiss: (id: number) => void;
  undismiss: (id: number) => void;
  close?: () => void;
}
export const List = ({ notices, dismiss, undismiss, close }: Props) => (
  <Notification title="Bulles pour cette page" hasNotices close={close}>
    {notices
      .slice(0, 2)
      .map(
        ({
          id,
          description,
          contributor: { name },
          resource: { url },
          criteria,
          dismissed,
          disliked,
          read
        }) => (
          <NoticeItem
            key={id}
            id={id}
            type={findType(criteria)}
            message={description}
            contributor={name}
            dismiss={dismiss}
            undismiss={undismiss}
            dismissed={dismissed}
            disliked={disliked}
            read={read}
          />
        )
      )}
    {notices.length === 0 && <NoNotice />}
    {notices.length > 0 && (
      <AddNotice
        as="a"
        href="https://form.jotformeu.com/82702852284358"
        target="_blank"
        rel="noopener noreferrer"
      />
    )}
  </Notification>
);

export default withConnect(List);
