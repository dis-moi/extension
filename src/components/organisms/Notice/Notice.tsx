import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { stripHtml } from 'app/utils/stripHtml';
import {
  Contributor,
  OpenButton,
  Button,
  Timer,
  CenterContainer
} from '../../atoms';
import Avatar from '../../atoms/Avatar/Avatar';
import AvatarDefault from '../../atoms/icons/AvatarDefault';
import Container, { height, marginTop } from './Container';
import Content from './Content';
import Deleted from './Deleted';
import DeleteButton from './DeleteButton';
import Title from './Title';
import { StatefulNotice } from '../../../app/lmem/notice';
import {
  CountDownState,
  initialState as countdownInitialState
} from '../../../app/lmem/countdown';

export const transitionKeys = {
  from: {
    height,
    marginTop,
    opacity: 0,
    transform: 'translate3d(0%,200%,0)'
  },
  enter: { opacity: 1, transform: 'translate3d(0%,0%,0)' },
  leave: () => async (next: (...args: any[]) => Promise<{}>) => {
    await next({ opacity: 0, transform: 'translate3d(100%,0%,0)' });
    await next({ height: 0, marginTop: 0 });
  }
};

const Description = styled.div`
  width: 245px;
`;

export interface NoticeTransitionProps {
  item: StatefulNotice;
  props: object;
  key: string;
}

interface Props {
  notice: StatefulNotice;
  dismiss: (id: number) => void;
  confirmDismiss: (id: number) => void;
  undismiss: (id: number) => void;
  truncateTitleAt?: number;
  style?: object;
}

export default class Notice extends PureComponent<Props, CountDownState> {
  constructor(props: Props) {
    super(props);
    this.state = countdownInitialState;
  }

  static defaultProps = {
    truncateTitleAt: Title.defaultProps.numberOfCharacters
  };

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
      truncateTitleAt,
      style
    } = this.props;

    const { countdown, intervalID } = this.state;

    return (
      <Container style={style}>
        {!dismissed && !disliked && <DeleteButton onClick={this.onDismiss} />}
        <Content
          to={dismissed || intervalID ? undefined : `notices/details/${id}`}
          isRead={read}
        >
          {(dismissed || disliked) && intervalID ? (
            <>
              <Deleted>Cette bulle ne s’affichera plus !</Deleted>
              <CenterContainer>
                <Button onClick={this.onUndismiss}>Annuler</Button>
                <Timer>({countdown}s)</Timer>
              </CenterContainer>
            </>
          ) : (
            <>
              <Avatar>
                <AvatarDefault />
              </Avatar>
              <Description>
                <Title numberOfCharacters={truncateTitleAt}>
                  {stripHtml(message)}
                </Title>
                <Contributor>Par : {contributor.name}</Contributor>
              </Description>
              <OpenButton />
            </>
          )}
        </Content>
      </Container>
    );
  }
}
