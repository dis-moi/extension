import React from 'react';
import { compose } from 'redux';
import withTitle from 'app/hocs/withTitle';
import NoticeDetails, {
  NoticeDetailsMethodsProps
} from 'components/organisms/NoticeDetails/NoticeDetails';
import { StatefulNotice } from 'app/lmem/notice';
import withConnect from './withConnect';

export interface DetailsScreenDataProps {
  notice?: StatefulNotice;
}

export type DetailsScreenProps = DetailsScreenDataProps &
  NoticeDetailsMethodsProps;

export const Details = ({
  notice,
  like,
  unlike,
  dislike,
  confirmDislike,
  undislike,
  view,
  outboundLinkClicked,
  goBack,
  clickContributor
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
        outboundLinkClicked={outboundLinkClicked}
        goBack={goBack}
        clickContributor={clickContributor}
      />
    );
  }

  return null;
};

export default compose(
  withConnect,
  withTitle<DetailsScreenProps>('Détail de la bulle')
)(Details);
