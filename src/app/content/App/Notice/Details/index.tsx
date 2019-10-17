import React from 'react';
import { compose } from 'redux';
import withTitle from 'app/hocs/withTitle';
import NoticeDetails from 'components/organisms/NoticeDetails/NoticeDetails';
import withConnect, {
  DetailsDispatchProps,
  DetailsStateProps
} from './withConnect';

export type DetailsScreenProps = DetailsDispatchProps & DetailsStateProps;

export const Details = ({
  notice,
  like,
  unlike,
  dislike,
  confirmDislike,
  undislike,
  view,
  followSource,
  clickMessage
}: DetailsScreenProps) => {
  if (notice) {
    return (
      <NoticeDetails
        notice={notice}
        like={like}
        unlike={unlike}
        dislike={dislike}
        confirmDislike={confirmDislike}
        undislike={undislike}
        view={view}
        followSource={followSource}
        clickMessage={clickMessage}
      />
    );
  }

  return null;
};

export default compose(
  withConnect,
  withTitle<DetailsScreenProps>('Détail de la bulle')
)(Details);
