import React from 'react';
import { useTransition } from 'react-spring';
import { StatefulNoticeWithContributor } from 'app/lmem/notice';
import { Contributor } from 'app/lmem/contributor';
import { AddNoticeContainer } from 'components/atoms';
import AddNoticeButton from 'components/atoms/Button/AddNoticeButton';
import NoticeItem, {
  NoticeTransitionProps,
  transitionKeys
} from 'components/organisms/Notice/Notice';
import ListContainer from './ListContainer';
import withConnect from './withConnect';

export interface Props {
  notices: StatefulNoticeWithContributor[];
  dismiss: (id: number) => void;
  confirmDismiss: (id: number) => void;
  undismiss: (id: number) => void;
  onContributorClick: (contributor: Contributor) => void;
}

export const ListScreen = ({
  notices,
  dismiss,
  confirmDismiss,
  undismiss,
  onContributorClick
}: Props) => {
  const countNotices = (notices && notices.length) || 0;

  const transitions = useTransition(
    notices.slice(0, countNotices),
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
              onContributorClick={onContributorClick}
            />
          )
        )}
      </ListContainer>

      <AddNoticeContainer shadow={countNotices > 2}>
        <AddNoticeButton />
      </AddNoticeContainer>
    </>
  );
};

export default withConnect(ListScreen);
