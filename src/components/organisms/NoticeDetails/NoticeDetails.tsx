import React, { MouseEvent, PureComponent } from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import ThumbUp from 'components/atoms/icons/ThumbUp';
import ThumbDown from 'components/atoms/icons/ThumbDown';
import Avatar from 'components/molecules/Avatar/Avatar';
import { Button, ContributorName, Timer } from 'components/atoms';
import { Relay } from 'components/atoms/icons';
import { StatefulNoticeWithContributor } from 'app/lmem/notice';
import {
  CountDownState,
  initialState as countdownInitialState
} from 'app/lmem/countdown';
import DetailsContainer from './DetailsContainer';
import DetailsContent from './DetailsContent';
import DetailsMeta from './DetailsMeta';
import DetailsDislike from './DetailsDislike';
import Message from './Message';
import Feedbacks from './Feedbacks';
import Date from './Date';
import { Contributor } from 'app/lmem/contributor';

const DetailsMetaValue = styled.div`
  margin-left: 10px;
`;

const DetailsScroll = styled.div`
  margin-top: 10px;
  max-height: 200px;
  overflow-y: auto;
`;

const AvatarNotice = styled(Avatar)`
  position: relative;

  &:hover {
    cursor: pointer;

    &:before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #000000;
      border-radius: 50%;
      opacity: 0.29;
    }
  }
`;

const ContributorNotice = styled(ContributorName)`
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const RelayPart = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  margin-top: 2px;
  font-size: 13px;

  & > svg {
    margin-right: 6px;
  }
`;

const Relayer = styled(ContributorNotice)`
  max-width: 205px;
  margin-left: 4px;
  font-size: 13px;
  line-height: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export interface NoticeDetailsDataProps {
  notice: StatefulNoticeWithContributor;
  relayer?: Contributor;
}

export interface NoticeDetailsMethodsProps {
  like: (id: number) => void;
  unlike: (id: number) => void;
  dislike: (id: number) => void;
  confirmDislike: (id: number) => void;
  undislike: (id: number) => void;
  view?: (id: number) => void;
  outboundLinkClicked?: (id: number, clickedUrl: string) => void;
  goBack: () => void;
  onContributorClick: (contributor: Contributor) => void;
}

export type NoticeDetailsProps = NoticeDetailsDataProps &
  NoticeDetailsMethodsProps;

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
        goBack
      } = this.props;
      confirmDislike(id);
      goBack();
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

  handleMessageClick = (e: MouseEvent) => {
    const {
      outboundLinkClicked,
      notice: { id }
    } = this.props;
    if (outboundLinkClicked) {
      if ((e.target as HTMLElement).tagName.toLowerCase() === 'a') {
        outboundLinkClicked(
          id,
          (e.target as HTMLElement).getAttribute('href') as string
        );
      }
    }
  };

  handleContributorClicked = () => {
    const {
      onContributorClick,
      notice: { contributor }
    } = this.props;
    onContributorClick(contributor);
  };

  handleRelayerClicked = () => {
    const { onContributorClick, relayer } = this.props;
    if (relayer) onContributorClick(relayer);
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
        message,
        modified,
        contributor,
        ratings: { likes, dislikes },
        state: { liked, disliked, dismissed }
      },
      relayer
    } = this.props;

    const { countdown, intervalID } = this.state;

    return (
      <DetailsContainer>
        <DetailsContent>
          <DetailsMeta>
            <AvatarNotice
              contributor={contributor}
              size="small"
              onClick={this.handleContributorClicked}
            />

            <DetailsMetaValue>
              <Date>Le {format(modified, 'DD/MM/YYYY')}</Date>
              <ContributorNotice onClick={this.handleContributorClicked}>
                {contributor.name}
              </ContributorNotice>

              {relayer && (
                <RelayPart>
                  <Relay />
                  relayé par
                  <Relayer onClick={this.handleRelayerClicked}>
                    {relayer.name}
                  </Relayer>
                </RelayPart>
              )}
            </DetailsMetaValue>
          </DetailsMeta>

          <DetailsScroll>
            <Message onClick={this.handleMessageClick}>{message}</Message>
          </DetailsScroll>

          <Feedbacks>
            <Button onClick={this.handleLikeClick}>
              <ThumbUp filled={liked} />
              {likes}
            </Button>
            <Button onClick={this.handleDislikeClick}>
              <ThumbDown filled={disliked} />
              {dislikes}
            </Button>
          </Feedbacks>

          {(disliked || dismissed) && intervalID && (
            <DetailsDislike>
              Merci pour votre retour, cette contribution ne s’affichera plus
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

export default NoticeDetails;
