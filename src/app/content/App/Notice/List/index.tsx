import React from 'react';
import { compose } from 'redux';
import { Transition } from 'react-spring/renderprops';

import { AddNoticeContainer, AddNoticeButton } from 'components/atoms';
import NoticeItem from 'components/organisms/Notice/Notice';
import { height, marginBottom } from 'components/organisms/Notice/Container';
import ListContainer from './ListContainer';
import { StatefulNotice } from 'app/lmem/notice';
import withTitle from 'app/hocs/withTitle';
import NoNotice from './NoNotice';
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
  return (
    <>
      <ListContainer>
        <Transition
          items={notices}
          keys={notice => notice.id}
          from={{
            height,
            marginBottom,
            opacity: 0,
            transform: 'translate3d(0%,100%,0)'
          }}
          enter={{ opacity: 1, transform: 'translate3d(0%,0%,0)' }}
          leave={() => async (next: (...args: any[]) => Promise<{}>) => {
            await next({ opacity: 0, transform: 'translate3d(95%,0%,0)' });
            await next({ height: 0, marginBottom: 0 });
          }}
          reset={false}
          trail={250}
          config={{ tension: 180, friction: 20 }}
          unique
          native
        >
          {notice => props => (
            <NoticeItem
              style={props}
              notice={notice}
              dismiss={dismiss}
              confirmDismiss={confirmDismiss}
              undismiss={undismiss}
              clickContributor={clickContributor}
            />
          )}
        </Transition>
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
