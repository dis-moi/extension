import React from 'react';
import Notification from '../../../../../components/organisms/Notification';
import NoticeDetails from '../../../../../components/organisms/NoticeDetails/NoticeDetails';
import withConnect from './withConnect';
import { DetailsProps } from './types';

export const Details = ({
  notice,
  like,
  unlike,
  dislike,
  undislike,
  close,
  view
}: DetailsProps) =>
  notice ? (
    <Notification title="Détail de la bulle" hasNotices close={close}>
      <NoticeDetails
        notice={notice}
        like={like}
        unlike={unlike}
        dislike={dislike}
        undislike={undislike}
        view={view}
      />
    </Notification>
  ) : null;

export default withConnect(Details);
