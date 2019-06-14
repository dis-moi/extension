import React from 'react';
import Notification from '../../../../../components/organisms/Notification';
import NoticeDetails from '../../../../../components/organisms/NoticeDetails/NoticeDetails';
import withConnect, {
  DetailsDispatchProps,
  DetailsStateProps
} from './withConnect';

export const Details = ({
  notice,
  like,
  unlike,
  dislike,
  undislike,
  close,
  view,
  followSource,
  preview
}: DetailsDispatchProps & DetailsStateProps) =>
  notice ? (
    <Notification title="Détail de la bulle" hasNotices close={close}>
      <NoticeDetails
        notice={notice}
        like={like}
        unlike={unlike}
        dislike={dislike}
        undislike={undislike}
        view={view}
        followSource={followSource}
        preview={preview}
      />
    </Notification>
  ) : null;

export default withConnect(Details);
