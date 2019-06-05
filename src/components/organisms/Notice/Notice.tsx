import React, { PureComponent } from 'react';
import { stripHtml } from 'app/utils/stripHtml';
import {
  Contributor,
  OpenButton,
  Button,
  Timer,
  CenterContainer
} from '../../atoms';
import Container, { height, marginTop } from './Container';
import Content from './Content';
import Deleted from './Deleted';
import DeleteButton from './DeleteButton';
import Title from './Title';
import { StatefulNotice } from '../../../app/lmem/notice';
import IntentionIcon from '../../molecules/Type/IntentionIcon';
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

export interface NoticeTransitionProps {
  item: StatefulNotice;
  props: object;
  key: string;
}

interface Props {
  notice: StatefulNotice;
  dismiss: (id: number) => void;
  undismiss: (id: number) => void;
  style?: object;
}

export default class Notice extends PureComponent<Props, CountDownState> {
  constructor(props: Props) {
    super(props);
    this.state = countdownInitialState;
  }

  static defaultProps = {
    type: 'Other',
    dismissed: false,
    disliked: false,
    read: false
  };

  onDismiss = () => {
    this.startCountdown();
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
      this.stopCountdown();
      console.log('DISMISSED');
      const { dismiss, notice } = this.props;
      dismiss(notice.id);
    }
  };

  stopCountdown = () => {
    const { intervalID } = this.state;
    if (intervalID) {
      window.clearInterval(intervalID);
    }
  };

  onUndismiss = () => {
    this.stopCountdown();
  };

  componentWillUnmount(): void {
    this.stopCountdown();
  }

  render() {
    const {
      notice: {
        id,
        intention,
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
        <Content
          to={dismissed ? undefined : `notices/details/${id}`}
          read={read}
        >
          {intervalID ? (
            <>
              <Deleted>Cette bulle ne s’affichera plus !</Deleted>
              <CenterContainer>
                <Button onClick={this.onUndismiss}>Annuler</Button>
                <Timer>({countdown}s)</Timer>
              </CenterContainer>
            </>
          ) : (
            <>
              <IntentionIcon intention={intention} />
              <div>
                <Title>{stripHtml(message)}</Title>
                <Contributor>Par : {contributor.name}</Contributor>
              </div>
              <OpenButton />
            </>
          )}
        </Content>
      </Container>
    );
  }
}
