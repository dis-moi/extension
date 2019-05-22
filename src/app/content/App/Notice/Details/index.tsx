import React from 'react';
import NoticeDetails from '../../../../../components/organisms/NoticeDetails/NoticeDetails';
import withConnect, {
  DetailsDispatchProps,
  DetailsStateProps
} from './withConnect';

import ScreenProps, { useUITitleEffect } from '../../../ScreenProps';

export type DetailsScreenProps = ScreenProps &
  DetailsDispatchProps &
  DetailsStateProps;

export const Details = ({
  notice,
  like,
  unlike,
  dislike,
  undislike,
  close,
  view,
  followSource,
  ...props
}: DetailsScreenProps) => {
  if (notice) {
    useUITitleEffect(props)('Détail de la bulle');

    return (
      <NoticeDetails
        notice={notice}
        like={like}
        unlike={unlike}
        dislike={dislike}
        undislike={undislike}
        view={view}
        followSource={followSource}
      />
    );
  }

  return null;
};

export default withConnect(Details);
