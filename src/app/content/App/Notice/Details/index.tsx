import React from 'react';
import { compose } from 'redux';
import withTitle from 'app/hocs/withTitle';
import NoticeDetails, {
  NoticeDetailsMethodsProps
} from 'components/organisms/NoticeDetails/NoticeDetails';
import { StatefulNoticeWithContributor } from 'app/lmem/notice';
import { Contributor } from 'app/lmem/contributor';
import withConnect from './withConnect';

export interface DetailsScreenDataProps {
  notice?: StatefulNoticeWithContributor;
  relayed?: boolean;
  relayer?: Contributor;
}

export type DetailsScreenProps = DetailsScreenDataProps &
  NoticeDetailsMethodsProps;

export const Details = ({
  notice,
  relayer,
  like,
  unlike,
  dislike,
  confirmDislike,
  undislike,
  view,
  outboundLinkClicked,
  goBack,
  onContributorClick
}: DetailsScreenProps) => {
  if (notice) {
    return (
      <NoticeDetails
        notice={notice}
        relayer={relayer}
        like={like}
        unlike={unlike}
        dislike={dislike}
        confirmDislike={confirmDislike}
        undislike={undislike}
        view={view}
        outboundLinkClicked={outboundLinkClicked}
        goBack={goBack}
        onContributorClick={onContributorClick}
      />
    );
  }

  return null;
};

export default compose(
  withConnect,
  withTitle<DetailsScreenProps>('Détail de la contribution')
)(Details);
