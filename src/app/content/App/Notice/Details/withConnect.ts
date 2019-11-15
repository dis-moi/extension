import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import {
  likeNotice,
  unlikeNotice,
  dislikeNotice,
  confirmDislikeNotice,
  undislikeNotice,
  unfoldNotice,
  outboundLinkClicked
} from 'app/actions/notices';
import { ContentState } from '../../../store';
import { getNoticeById } from '../../../selectors';
import { DetailsProps } from './types';
import { StatefulNotice } from '../../../../lmem/notice';

export interface DetailsStateProps {
  notice?: StatefulNotice;
}

const mapStateToProps = (
  state: ContentState,
  props: DetailsProps & RouteComponentProps
): DetailsStateProps | undefined => ({
  notice: getNoticeById(state, props)
});

export interface DetailsDispatchProps {
  like: (id: number) => void;
  unlike: (id: number) => void;
  dislike: (id: number) => void;
  confirmDislike: (id: number) => void;
  undislike: (id: number) => void;
  view: (id: number) => void;
  outboundLinkClicked: (id: number, url?: string) => void;
}

const mapDispatchToProps: DetailsDispatchProps = {
  like: likeNotice,
  unlike: unlikeNotice,
  dislike: dislikeNotice,
  confirmDislike: confirmDislikeNotice,
  undislike: undislikeNotice,
  view: unfoldNotice,
  outboundLinkClicked
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
