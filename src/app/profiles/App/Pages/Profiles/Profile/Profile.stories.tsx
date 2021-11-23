import React, { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { MemoryRouter as Router } from 'react-router-dom';
import { action } from '@storybook/addon-actions';
import { StoryFn } from '@storybook/addons';
import { createBrowserHistory } from 'history';
import {
  generatePinnedNotice,
  generateStatefulNotice
} from 'test/fakers/generateNotice';
import { generateStatefulContributor } from 'test/fakers/generateContributor';
import rootReducer from '../../../../store/reducers';
import Profile from './Profile';

const store = createStore(rootReducer(createBrowserHistory()));

export default {
  title: 'Profile/Profile',

  decorators: [
    (getStory: StoryFn<ReactElement>) => (
      <Router>
        <Provider store={store}>{getStory()}</Provider>
      </Router>
    )
  ]
};

export const Normal = () => (
  <Profile
    featuredNotices={[generatePinnedNotice(), generatePinnedNotice()]}
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
  />
);

export const Loading = () => (
  <Profile
    featuredNotices={[
      generatePinnedNotice(),
      generatePinnedNotice(),
      generatePinnedNotice()
    ]}
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
  />
);

Loading.story = {
  name: 'loading'
};

export const ContributorsLoading = () => (
  <Profile
    featuredNotices={[
      generatePinnedNotice(),
      generatePinnedNotice(),
      generatePinnedNotice()
    ]}
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
  />
);

ContributorsLoading.story = {
  name: 'contributorsLoading'
};

export const NoticesLoading = () => (
  <Profile
    featuredNotices={[
      generatePinnedNotice(),
      generatePinnedNotice(),
      generatePinnedNotice()
    ]}
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
  />
);

NoticesLoading.story = {
  name: 'noticesLoading'
};

export const NoFeaturedNotices = () => (
  <Profile
    featuredNotices={[]}
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
  />
);

NoFeaturedNotices.story = {
  name: 'no featured notices'
};

export const _1FeaturedNotices = () => (
  <Profile
    featuredNotices={[generatePinnedNotice()]}
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
  />
);

_1FeaturedNotices.story = {
  name: '1 featured notices'
};
