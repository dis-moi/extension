import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { storiesOf } from '@storybook/react';
import { MemoryRouter as Router } from 'react-router-dom';
import { action } from '@storybook/addon-actions';
import { createBrowserHistory } from 'history';
import Profile from './Profile';
import { generateStatefulNotice } from 'test/fakers/generateNotice';
import { generateStatefulContributor } from 'test/fakers/generateContributor';
import rootReducer from '../../../../store/reducers';

const store = createStore(rootReducer(createBrowserHistory()));

storiesOf('Profile/Profile', module)
  .addDecorator(getStory => (
    <Router>
      <Provider store={store}>{getStory()}</Provider>
    </Router>
  ))
  .add('Normal', () => (
    <Profile
      featuredNotice={generateStatefulNotice()}
      notices={[
        generateStatefulNotice(),
        generateStatefulNotice(),
        generateStatefulNotice(),
        generateStatefulNotice()
      ]}
      noticesLoading={false}
      subscribe={action('subscribe')}
      unsubscribe={action('unsubscribe')}
      fetchMoreNotices={action('fetchMoreNotices')}
      fetchedAll={false}
      contributor={generateStatefulContributor()}
      contributors={[
        generateStatefulContributor(),
        generateStatefulContributor()
      ]}
      connected={false}
      addToBrowser={action('addToBrowser')}
    />
  ))
  .add('loading', () => (
    <Profile
      featuredNotice={generateStatefulNotice()}
      notices={[
        generateStatefulNotice(),
        generateStatefulNotice(),
        generateStatefulNotice(),
        generateStatefulNotice()
      ]}
      noticesLoading={false}
      subscribe={action('subscribe')}
      unsubscribe={action('unsubscribe')}
      fetchMoreNotices={action('fetchMoreNotices')}
      fetchedAll={false}
      contributor={generateStatefulContributor({ loading: true })}
      contributors={[
        generateStatefulContributor(),
        generateStatefulContributor()
      ]}
      connected={false}
      addToBrowser={action('addToBrowser')}
    />
  ))
  .add('contributorsLoading', () => (
    <Profile
      featuredNotice={generateStatefulNotice()}
      notices={[
        generateStatefulNotice(),
        generateStatefulNotice(),
        generateStatefulNotice(),
        generateStatefulNotice()
      ]}
      noticesLoading={false}
      subscribe={action('subscribe')}
      unsubscribe={action('unsubscribe')}
      fetchMoreNotices={action('fetchMoreNotices')}
      fetchedAll={false}
      contributor={generateStatefulContributor()}
      contributors={[
        generateStatefulContributor(),
        generateStatefulContributor()
      ]}
      connected={false}
      addToBrowser={action('addToBrowser')}
    />
  ))
  .add('noticesLoading', () => (
    <Profile
      featuredNotice={generateStatefulNotice()}
      notices={[
        generateStatefulNotice(),
        generateStatefulNotice(),
        generateStatefulNotice(),
        generateStatefulNotice()
      ]}
      noticesLoading
      subscribe={action('subscribe')}
      unsubscribe={action('unsubscribe')}
      fetchMoreNotices={action('fetchMoreNotices')}
      fetchedAll={false}
      contributor={generateStatefulContributor()}
      contributors={[
        generateStatefulContributor(),
        generateStatefulContributor()
      ]}
      connected={false}
      addToBrowser={action('addToBrowser')}
    />
  ));
