import React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { getNoticesToDisplay } from 'app/content/store/selectors';
import { ContentState } from 'app/content/store/reducers';
import { StatefulNotice } from 'libs/domain/notice';
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
