import React from 'react';
import { compose } from 'redux';
import { useTransition } from 'react-spring';

import { AddNoticeContainer, AddNoticeButton } from 'components/atoms';
import NoticeItem, {
  NoticeTransitionProps,
  transitionKeys
} from 'components/organisms/Notice/Notice';
import ListContainer from './ListContainer';
import { StatefulNotice } from 'app/lmem/notice';
import withTitle from 'app/hocs/withTitle';
import NoNotice from '../NoNotice';
import withConnect from './withConnect';

export interface Props {
  notices: StatefulNotice[];
  dismiss: (id: number) => void;
  confirmDismiss: (id: number) => void;
  undismiss: (id: number) => void;
  clickContributor: (id: number) => void;
}

export const ListScreen = ({
  notices,
  dismiss,
  confirmDismiss,
  undismiss,
  clickContributor
}: Props) => {
  const transitions = useTransition(
    notices.slice(0, 2),
    notice => notice.id,
    // eslint-disable-next-line
    // @ts-ignore
    transitionKeys
  );

  return (
    <>
      <ListContainer>
        {transitions.map(
          ({ item: notice, props, key }: NoticeTransitionProps) => (
            <NoticeItem
              key={key}
              style={props}
              notice={notice}
              dismiss={dismiss}
              confirmDismiss={confirmDismiss}
              undismiss={undismiss}
              clickContributor={clickContributor}
            />
          )
        )}
      </ListContainer>
      {notices.length === 0 && <NoNotice />}
      {notices.length > 0 && (
        <AddNoticeContainer>
          <AddNoticeButton />
        </AddNoticeContainer>
      )}
    </>
  );
};

export default compose(
  withConnect,
  withTitle<Props>('Bulles pour cette page')
)(ListScreen);
