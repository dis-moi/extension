import React from 'react';
import NoticeItem from 'components/organisms/Notice/Notice';
import AddNotice from 'components/molecules/AddNotice';
import NoNotice from './NoNotice';
import withConnect from './withConnect';
import { StatefulNotice } from '../../../../lmem/notice';
import ScreenProps, { useUITitleEffect } from '../../../ScreenProps';

export interface Props extends ScreenProps {
  notices: StatefulNotice[];
  dismiss: (id: number) => void;
  undismiss: (id: number) => void;
  close?: () => void;
}
export const List = ({
  notices,
  dismiss,
  undismiss,
  close,
  ...props
}: Props) => {
  useUITitleEffect(props)('Bulles Pour cette page');

  return (
    <>
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
    </>
  );
};

export default withConnect(List);
