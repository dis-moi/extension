import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Profile from './Profile';
import { generateStatefulNotice } from 'test/fakers/generateNotice';
import { generateStatefulContributor } from 'test/fakers/generateContributor';
import { MemoryRouter as Router } from 'react-router-dom';

storiesOf('Profile/Profile', module)
  .addDecorator(getStory => <Router>{getStory()}</Router>)
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
      similarContributors={[
        generateStatefulContributor(),
        generateStatefulContributor()
      ]}
      contributors={[
        generateStatefulContributor(),
        generateStatefulContributor()
      ]}
      contributorsLoading={false}
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
      similarContributors={[
        generateStatefulContributor(),
        generateStatefulContributor()
      ]}
      contributors={[
        generateStatefulContributor(),
        generateStatefulContributor()
      ]}
      contributorsLoading={false}
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
      similarContributors={[
        generateStatefulContributor(),
        generateStatefulContributor()
      ]}
      contributors={[
        generateStatefulContributor(),
        generateStatefulContributor()
      ]}
      contributorsLoading={true}
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
      similarContributors={[
        generateStatefulContributor(),
        generateStatefulContributor()
      ]}
      contributors={[
        generateStatefulContributor(),
        generateStatefulContributor()
      ]}
      contributorsLoading={false}
      connected={false}
      addToBrowser={action('addToBrowser')}
    />
  ));
