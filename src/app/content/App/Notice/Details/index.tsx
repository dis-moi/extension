import React from 'react';
import { compose } from 'redux';
import withTitle from 'app/hocs/withTitle';
import NoticeDetails, {
  NoticeDetailsMethodsProps
} from 'components/organisms/NoticeDetails/NoticeDetails';
import { StatefulNotice } from 'app/lmem/notice';
import { Contributor } from 'app/lmem/contributor';
import withConnect from './withConnect';

export interface DetailsScreenDataProps {
  notice?: StatefulNotice;
  relayed?: boolean;
  relayer?: Contributor;
}

export type DetailsScreenProps = DetailsScreenDataProps &
  NoticeDetailsMethodsProps;

export const Details = ({
  notice,
  relayed,
  relayer,
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
        relayed={relayed}
        relayer={relayer}
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
  withTitle<DetailsScreenProps>('Détail de la contribution')
)(Details);
