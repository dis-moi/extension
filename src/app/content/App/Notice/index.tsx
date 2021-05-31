import React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { ContentState } from 'app/content/store';
import { getNoticesToDisplay } from 'app/content/selectors';
import { StatefulNotice } from 'libs/lmem/notice';
import ListScreen from './List';
import DetailsScreen from './Details';
import NoNoticeScreen from './NoNotice';

const mapStateToProps = (state: ContentState) => ({
  notices: getNoticesToDisplay(state)
});

export interface NoticeScreenProps extends RouteComponentProps {
  notices: StatefulNotice[];
}

const NoticeScreen = ({ match, location, notices }: NoticeScreenProps) => {
  if (notices.length === 0) {
    return <NoNoticeScreen />;
  }

  return (
    <Switch location={location}>
      <Route path={match.url} exact component={ListScreen} />
      <Route path={`${match.url}/details/:id`} component={DetailsScreen} />
    </Switch>
  );
};

export default connect(mapStateToProps)(NoticeScreen);
