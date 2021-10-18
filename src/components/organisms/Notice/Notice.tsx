import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { withTranslation } from 'react-i18next';
import { TFunction } from 'i18next';
import InteractiveAvatar from 'components/molecules/InteractiveAvatar';
import Relay from 'components/atoms/icons/Relay';
import {
  Button,
  CenterContainer,
  ContributorName,
  RelayPart,
  Timer
} from 'components/atoms';
import { stripHtml } from 'libs/utils/stripHtml';
import { StatefulNoticeWithContributor } from 'libs/domain/notice';
import { Contributor } from 'libs/domain/contributor';
import {
  CountDownState,
  initialState as countdownInitialState
} from 'libs/domain/countdown';
import Title from './Title';
import DeleteButton from './DeleteButton';
import Deleted from './Deleted';
import Content from './Content';
import Container, { height, marginBottom } from './Container';

export const transitionKeys = {
  from: {
    height,
    marginBottom,
    opacity: 0,
    transform: 'translate3d(0%,100%,0)'
  },
  enter: { opacity: 1, transform: 'translate3d(0%,0%,0)' },
  leave: () => async (next: (...args: any[]) => Promise<{}>) => {
    await next({ opacity: 0, transform: 'translate3d(95%,0%,0)' });
    await next({ height: 0, marginBottom: 0 });
  },
  trail: 250,
  unique: true,
  reset: false,
  config: { tension: 180, friction: 20 }
};

const Description = styled.div`
  width: 245px;
`;

const NoticeContributorName = styled(ContributorName)`
  display: inline-block;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

export interface NoticeTransitionProps {
  item: StatefulNoticeWithContributor;
  props: object;
  key: string;
}

interface Props {
  notice: StatefulNoticeWithContributor;
  dismiss: (id: number) => void;
  confirmDismiss: (id: number) => void;
  undismiss: (id: number) => void;
  onContributorClick: (contributor: Contributor) => void;
  truncateTitleAt?: number;
  style?: object;
  t: TFunction;
}

class Notice extends PureComponent<Props, CountDownState> {
  constructor(props: Props) {
    super(props);
    this.state = countdownInitialState;
  }

  onDismiss = () => {
    this.props.dismiss(this.props.notice.id);
    this.startCountdown();
  };

  onUndismiss = () => {
    this.props.undismiss(this.props.notice.id);
    this.stopCountdown();
  };

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
      const {
        confirmDismiss,
        notice: { id }
      } = this.props;
      confirmDismiss(id);
      this.stopCountdown();
    }
  };

  stopCountdown = () => {
    const { intervalID } = this.state;
    if (intervalID) {
      window.clearInterval(intervalID);
      this.setState({ intervalID: null });
    }
  };

  get isInteractive(): boolean {
    const {
      notice: {
        state: { dismissed }
      }
    } = this.props;
    const { intervalID } = this.state;

    return !dismissed && !intervalID;
  }

  onContributorClicked = () => {
    if (this.isInteractive) {
      const {
        notice: { contributor },
        onContributorClick
      } = this.props;
      onContributorClick(contributor);
    }
  };

  componentWillUnmount(): void {
    this.stopCountdown();
  }

  render() {
    const {
      notice: {
        id,
        message,
        contributor,
        state: { dismissed, disliked, read }
      },
      style,
      t
    } = this.props;

    const { countdown, intervalID } = this.state;

    return (
      <Container style={style}>
        {!dismissed && !disliked && <DeleteButton onClick={this.onDismiss} />}
        <Content isRead={read}>
          {(dismissed || disliked) && intervalID ? (
            <>
              <Deleted>{t('notice.feedback_deleted')}</Deleted>
              <CenterContainer>
                <Button onClick={this.onUndismiss}>{t('action.cancel')}</Button>
                <Timer>({countdown}s)</Timer>
              </CenterContainer>
            </>
          ) : (
            <>
              <InteractiveAvatar
                onClick={this.onContributorClicked}
                contributor={contributor}
                size="small"
              />
              <Description>
                <RelayPart>
                  <Relay />
                  Jean-Claude Duss
                </RelayPart>
                <NoticeContributorName onClick={this.onContributorClicked}>
                  {contributor.name}
                </NoticeContributorName>
                <Title
                  to={this.isInteractive ? `notices/details/${id}` : undefined}
                >
                  {stripHtml(message)}
                </Title>
              </Description>
            </>
          )}
        </Content>
      </Container>
    );
  }
}

export default withTranslation()(Notice);
