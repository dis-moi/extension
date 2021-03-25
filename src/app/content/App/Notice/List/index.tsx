import React from 'react';
import styled from 'styled-components';
import { useTransition } from 'react-spring';

import { StatefulNoticeWithContributor } from 'app/lmem/notice';
import { Contributor } from 'app/lmem/contributor';

import { AddNoticeContainer, Paragraph } from 'components/atoms';
import AddNoticeButton from 'components/atoms/Button/AddNoticeButton';
import NoticeItem, {
  NoticeTransitionProps,
  transitionKeys
} from 'components/organisms/Notice/Notice';
import ListContainer from './ListContainer';
import withConnect from './withConnect';

const BullesNumber = styled(Paragraph)`
  margin-top: 10px;
  text-align: center;
`;

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
  const transitions = useTransition(
    notices.slice(0, 3),
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
      <BullesNumber>
        Il y a <strong>3</strong> Bulles pour cette page
      </BullesNumber>
      <AddNoticeContainer>
        <AddNoticeButton />
      </AddNoticeContainer>
    </>
  );
};

export default withConnect(ListScreen);
