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
import Avatar from '../../molecules/Avatar/Avatar';
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

const ContributorNotice = styled(Contributor)`
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
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
      style
    } = this.props;

    const { countdown, intervalID } = this.state;

    return (
      <Container style={style}>
        {!dismissed && !disliked && <DeleteButton onClick={this.onDismiss} />}
        {/* <Content
          to={dismissed || intervalID ? undefined : `notices/details/${id}`}
          isRead={read}
        > */}
        {/* Avant y'avait un lien global, mais ça c'était avant */}
        <Content isRead={read}>
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
              <AvatarNotice contributor={contributor} size="small" />{' '}
              {/* Faut lier sur l'écran du contributeur, ça serait cool si le hover impactait les 2 */}
              <Description>
                <ContributorNotice>{contributor.name}</ContributorNotice>{' '}
                {/* Faut lier sur l'écran du contributeur, ça serait cool si le hover impactait les 2 */}
                <Title
                  to={
                    dismissed || intervalID
                      ? undefined
                      : `notices/details/${id}`
                  }
                >
                  {stripHtml(message)}
                </Title>{' '}
                {/* Lien vers le détail de la notice */}
              </Description>
              <OpenButton />
            </>
          )}
        </Content>
      </Container>
    );
  }
}
