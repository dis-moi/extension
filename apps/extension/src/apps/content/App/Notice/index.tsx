import React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import { ContentState } from 'apps/extension/src/apps/content/store';
import { getNoticesToDisplay } from 'apps/extension/src/apps/content/selectors';
import { StatefulNotice } from 'libs/lmem/notice';
import ListScreen from './List';
import DetailsScreen from './Details';
import NoNoticeScreen from './NoNotice';
import { connect } from 'react-redux';

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
