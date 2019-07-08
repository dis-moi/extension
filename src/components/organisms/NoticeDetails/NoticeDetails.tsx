import React, { PureComponent } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Button, Contributor, Timer } from '../../atoms';
import Like from '../../atoms/icons/types/Like';
import Dislike from '../../atoms/icons/types/Dislike';
import Source from './Source/Source';
import SourceURL from './Source/SourceURL';
import DetailsContainer from './DetailsContainer';
import DetailsContent from './DetailsContent';
import DetailsMeta from './DetailsMeta';
import DetailsDislike from './DetailsDislike';
import Message from './Message';
import Feedbacks from './Feedbacks';
import Date from './Date';
import { StatefulNotice } from '../../../app/lmem/notice';
import { format } from 'date-fns';
import IntentionIcon from '../../molecules/Type/IntentionIcon';
import {
  CountDownState,
  initialState as countdownInitialState
} from '../../../app/lmem/countdown';

interface NoticeDetailsProps extends RouteComponentProps {
  notice: StatefulNotice;
  like: (id: number) => void;
  unlike: (id: number) => void;
  dislike: (id: number) => void;
  confirmDislike: (id: number) => void;
  undislike: (id: number) => void;
  view?: (id: number) => void;
  followSource?: (id: number) => void;
}
class NoticeDetails extends PureComponent<NoticeDetailsProps, CountDownState> {
  constructor(props: NoticeDetailsProps) {
    super(props);
    this.state = countdownInitialState;
  }

  startCountdown = () => {
    const intervalID = window.setInterval(this.updateCountdown, 1000);
    this.setState({ ...countdownInitialState, intervalID });
  };

  updateCountdown = () => {
    const { countdown } = this.state;
    this.setState({ countdown: countdown - 1 }, this.shouldStopCountDown);
  };

  shouldStopCountDown = () => {
    const { countdown } = this.state;
    if (countdown === 0) {
      this.stopCountdown();

      const {
        notice: { id },
        confirmDislike,
        history
      } = this.props;
      confirmDislike(id);
      history.goBack();
    }
  };

  stopCountdown = () => {
    if (this.state.intervalID) {
      window.clearInterval(this.state.intervalID);
      this.setState({ intervalID: null });
    }
  };

  handleLikeClick = () => {
    const { notice, like, unlike } = this.props;
    if (notice.state.liked) {
      unlike(notice.id);
    } else {
      like(notice.id);
    }
  };

  handleDislikeClick = () => {
    const {
      notice: {
        id,
        state: { disliked }
      },
      dislike,
      undislike
    } = this.props;
    if (disliked) {
      undislike(id);
    } else {
      dislike(id);
      this.startCountdown();
    }
  };

  handleCancelDislike = () => {
    const {
      notice: { id },
      undislike
    } = this.props;
    undislike(id);
    this.stopCountdown();
  };

  handleFollowSource = () => {
    const {
      followSource,
      notice: { id }
    } = this.props;
    if (followSource) {
      followSource(id);
    }
  };

  componentDidMount(): void {
    const {
      view,
      notice: { id }
    } = this.props;
    if (view) {
      view(id);
    }
  }

  render() {
    const {
      notice: {
        intention,
        message,
        created,
        contributor,
        source,
        ratings: { likes, dislikes },
        state: { liked, disliked, dismissed }
      }
    } = this.props;

    const { countdown, intervalID } = this.state;

    return (
      <DetailsContainer>
        <DetailsContent>
          <DetailsMeta>
            <Date>Le {format(created, 'DD/MM/YYYY')}</Date>
            <Contributor>{contributor.name} :</Contributor>
            <IntentionIcon intention={intention} />
          </DetailsMeta>

          <Message>{message}</Message>
          {source && (
            <Source>
              En savoir plus :{' '}
              <SourceURL onClick={this.handleFollowSource}>
                {source.url}
              </SourceURL>
            </Source>
          )}

          <Feedbacks>
            <Button onClick={this.handleLikeClick}>
              <Like active={liked} />
              {likes}
            </Button>
            <Button onClick={this.handleDislikeClick}>
              <Dislike active={disliked} />
              {dislikes}
            </Button>
          </Feedbacks>

          {(disliked || dismissed) && intervalID && (
            <DetailsDislike>
              Merci pour votre retour, cette bulle ne s’affichera plus
              <div>
                <Button onClick={this.handleCancelDislike}>Annuler</Button>
                <Timer>({countdown}s)</Timer>
              </div>
            </DetailsDislike>
          )}
        </DetailsContent>
      </DetailsContainer>
    );
  }
}

export default withRouter(NoticeDetails);
