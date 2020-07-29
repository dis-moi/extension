import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { stripHtml } from 'app/utils/stripHtml';
import {
  Button,
  CenterContainer,
  ContributorName,
  Timer
} from 'components/atoms';
import InteractiveAvatar from 'components/molecules/InteractiveAvatar';
import Container, { height, marginBottom } from './Container';
import Content from './Content';
import Deleted from './Deleted';
import DeleteButton from './DeleteButton';
import Title from './Title';
import { StatefulNoticeWithContributor } from 'app/lmem/notice';
import { Contributor } from 'app/lmem/contributor';
import {
  CountDownState,
  initialState as countdownInitialState
} from 'app/lmem/countdown';

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
}

export default class Notice extends PureComponent<Props, CountDownState> {
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
      style
    } = this.props;

    const { countdown, intervalID } = this.state;

    return (
      <Container style={style}>
        {!dismissed && !disliked && <DeleteButton onClick={this.onDismiss} />}
        <Content isRead={read}>
          {(dismissed || disliked) && intervalID ? (
            <>
              <Deleted>Cette contribution ne s’affichera plus !</Deleted>
              <CenterContainer>
                <Button onClick={this.onUndismiss}>Annuler</Button>
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
