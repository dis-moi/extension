import React, { Fragment, PureComponent } from 'react';
import { stripHtml } from 'app/utils/stripHtml';
import {
  Contributor,
  OpenButton,
  Button,
  Timer,
  CenterContainer
} from '../../atoms';
import Container from './Container';
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

interface Props {
  notice: StatefulNotice;
  dismiss: (id: number) => void;
  confirmDismiss: (id: number) => void;
  undismiss: (id: number) => void;
  truncateTitleAt?: number;
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
    read: false,
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
      const { confirmDismiss, notice: { id } } = this.props;
      confirmDismiss(id);
      this.stopCountdown();
    }
  };

  stopCountdown = () => {
    const { intervalID } = this.state;
    if (intervalID) {
      window.clearInterval(intervalID);
    }
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
      truncateTitleAt
    } = this.props;

    const { countdown, intervalID } = this.state;

    return (
      <Container>
        {!dismissed && !disliked && <DeleteButton onClick={this.onDismiss} />}
        <Content
          to={dismissed ? undefined : `notices/details/${id}`}
          read={read}
        >
          {(dismissed || disliked) && intervalID ? (
            <Fragment>
              <Deleted>Cette bulle ne s’affichera plus !</Deleted>
              <CenterContainer>
                <Button onClick={this.onUndismiss}>Annuler</Button>
                <Timer>({countdown}s)</Timer>
              </CenterContainer>
            </Fragment>
          ) : (
            <Fragment>
              <IntentionIcon intention={intention} />
              <div>
                <Title numberOfCharacters={truncateTitleAt}>
                  {stripHtml(message)}
                </Title>
                <Contributor>Par : {contributor.name}</Contributor>
              </div>
              <OpenButton />
            </Fragment>
          )}
        </Content>
      </Container>
    );
  }
}
