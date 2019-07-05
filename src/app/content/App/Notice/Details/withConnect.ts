import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import {
  likeNotice,
  unlikeNotice,
  dislikeNotice,
  undislikeNotice,
  readNotice,
  resourceLinkClicked
} from 'app/actions/notices';
import { State } from '../../../store';
import { getNoticeById } from '../../../selectors';
import { DetailsProps } from './types';
import { StatefulNotice } from '../../../../lmem/notice';
import { removeUITitle, setUITitle } from '../../../actions/ui/title';

export interface DetailsStateProps {
  notice?: StatefulNotice;
}

const mapStateToProps = (
  state: State,
  props: DetailsProps & RouteComponentProps
): DetailsStateProps | undefined => ({
  notice: getNoticeById(state, props)
});

export interface DetailsDispatchProps {
  like: (id: number) => void;
  unlike: (id: number) => void;
  dislike: (id: number) => void;
  undislike: (id: number) => void;
  view: (id: number) => void;
  close: () => void;
  followSource: (id: number) => void;
}

const mapDispatchToProps = {
  like: likeNotice,
  unlike: unlikeNotice,
  dislike: dislikeNotice,
  undislike: undislikeNotice,
  view: readNotice,
  followSource: resourceLinkClicked,
  setUITitle,
  removeUITitle
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
