import React from 'react';
import { useTransition } from 'react-spring';
import { compose } from 'redux';
import {
  List as ListContainer,
  AddNoticeContainer,
  AddNoticeLink
} from 'components/atoms';
import NoticeItem, {
  NoticeTransitionProps,
  transitionKeys
} from 'components/organisms/Notice/Notice';
import { StatefulNotice } from 'app/lmem/notice';
import withTitle from 'app/hocs/withTitle';
import NoNotice from './NoNotice';
import withConnect from './withConnect';

export interface Props {
  notices: StatefulNotice[];
  dismiss: (id: number) => void;
  undismiss: (id: number) => void;
}

export const ListScreen = ({ notices, dismiss, undismiss }: Props) => {
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

const Chose = compose(
  withConnect,
  withTitle<Props>('Bulles Pour cette page')
)(ListScreen);

export default Chose;
