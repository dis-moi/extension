import React, { ComponentType } from 'react';
import { compose, Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
  Redirect,
  Route,
  RouteComponentProps,
  Switch,
  withRouter
} from 'react-router';
import { close } from 'libs/store/actions';
import { CloseCause } from 'libs/domain/ui';
import Notification from 'components/organisms/Notification';
import { ContentState } from '../store/reducers';
import {
  getTitle,
  hasServiceMessage,
  isLoaded,
  isNoticeContext,
  isOpen
} from '../store/selectors';
import Notice from './Notice';
import Subscriptions from './Subscriptions';
import Help from './Help';
import Account from './Account';
import Loading from './Loading';
import Error from './Error';
import Contribute from './Contribute';
import Question from './Question';
import ServiceMessage from './ServiceMessage';

const mapStateToProps = (state: ContentState) => ({
  open: isOpen(state),
  loaded: isLoaded(state),
  title: getTitle(state),
  noticeContext: isNoticeContext(state),
  hasServiceMessage: hasServiceMessage(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  close: () => dispatch(close(CloseCause.CloseButton))
});

interface ConnectProps {
  open: boolean;
  loaded: boolean;
  title: string;
  close: () => void;
  noticeContext: boolean;
  hasServiceMessage: boolean;
}

type UIProps = ConnectProps & RouteComponentProps;

const UI = ({
  open,
  title,
  loaded,
  close,
  noticeContext,
  hasServiceMessage
}: UIProps) => {
  if (open) {
    return (
      <Notification
        title={title}
        close={close}
        closed={!open}
        hasNotices={noticeContext}
      >
        {loaded ? (
          <>
            {hasServiceMessage ? (
              <ServiceMessage />
            ) : (
              <Switch>
                <Redirect exact path="/" to="/notices" />
                <Route path="/notices" component={Notice} />
                <Route path="/subscriptions" component={Subscriptions} />
                <Route path="/help" component={Help} />
                <Route path="/account" component={Account} />
                <Route path="/contribute" component={Contribute} />
                <Route path="/question" component={Question} />
                <Route component={Error} />
              </Switch>
            )}
          </>
        ) : (
          <Loading />
        )}
      </Notification>
    );
  }

  return null;
};

export default compose<ComponentType<{}>>(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(UI);
