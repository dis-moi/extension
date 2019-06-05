import React from 'react';
import { useTransition } from 'react-spring';
import {
  List as ListContainer,
  AddNoticeContainer,
  AddNoticeLink
} from 'components/atoms';
import NoticeItem, {
  NoticeTransitionProps,
  transitionKeys
} from 'components/organisms/Notice/Notice';
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

export const ListScreen = ({
  notices,
  dismiss,
  undismiss,
  close,
  ...props
}: Props) => {
  useUITitleEffect(props)('Bulles Pour cette page');

  const transitions = useTransition(
    notices.slice(0, 2),
    notice => notice.id,
    // @ts-ignore
    transitionKeys
  );

  return (
    <>
      <ListContainer>
        {transitions.map(({ item, props, key }: NoticeTransitionProps) => (
          <NoticeItem
            key={key}
            notice={item}
            dismiss={dismiss}
            undismiss={undismiss}
            style={props}
          />
        ))}
      </ListContainer>
      {notices.length === 0 && <NoNotice />}
      {notices.length > 0 && (
        <AddNoticeContainer>
          <AddNoticeLink />
        </AddNoticeContainer>
      )}
    </>
  );
};

export default withConnect(ListScreen);
