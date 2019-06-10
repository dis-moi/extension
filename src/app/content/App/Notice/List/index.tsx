import React from 'react';
import Notification from 'components/organisms/Notification';
import NoticeItem from 'components/organisms/Notice/Notice';
import AddNotice from 'components/molecules/AddNotice';
import NoNotice from './NoNotice';
import withConnect from './withConnect';
import { StatefulNotice } from '../../../../lmem/notice';

export interface Props {
  notices: StatefulNotice[];
  dismiss: (id: number) => void;
  undismiss: (id: number) => void;
  close?: () => void;
}
export const List = ({ notices, dismiss, undismiss, close }: Props) => (
  <Notification title="Le Même en Mieux" hasNotices close={close}>
    {notices.slice(0, 2).map((notice: StatefulNotice) => (
      <NoticeItem
        key={notice.id}
        notice={notice}
        dismiss={dismiss}
        undismiss={undismiss}
      />
    ))}
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
