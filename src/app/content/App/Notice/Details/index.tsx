import React from 'react';
import Notification from '../../../../../components/organisms/Notification';
import NoticeDetails from '../../../../../components/organisms/NoticeDetails/NoticeDetails';
import withConnect from './withConnect';
import { DetailsProps } from './types';
import { findType } from 'app/lmem/noticeType';

export const Details = ({
  notice,
  like,
  unlike,
  dislike,
  undislike,
  close
}: DetailsProps) =>
  notice ? (
    <Notification title="Détail de la bulle" hasNotices close={close}>
      <NoticeDetails
        id={notice.id}
        type={findType(notice.criteria)}
        date="03 déc. 2018"
        message={notice.description}
        contributor={notice.contributor.name}
        source={notice.resource.url}
        like={like}
        unlike={unlike}
        dislike={dislike}
        undislike={undislike}
        liked={notice.liked}
        disliked={notice.disliked}
        dismissed={notice.dismissed}
      />
    </Notification>
  ) : null;

export default withConnect(Details);
