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
      loading={false}
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
      contributor={generateStatefulContributor()}
      contributors={[
        generateStatefulContributor(),
        generateStatefulContributor()
      ]}
      contributorsLoading={false}
      connected={false}
    />
  ))
  .add('loading', () => (
    <Profile
      loading
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
      contributor={generateStatefulContributor()}
      contributors={[
        generateStatefulContributor(),
        generateStatefulContributor()
      ]}
      contributorsLoading={false}
      connected={false}
    />
  ))
  .add('contributorsLoading', () => (
    <Profile
      loading={false}
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
      contributor={generateStatefulContributor()}
      contributors={[
        generateStatefulContributor(),
        generateStatefulContributor()
      ]}
      contributorsLoading
      connected={false}
    />
  ))
  .add('noticesLoading', () => (
    <Profile
      loading={false}
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
      contributor={generateStatefulContributor()}
      contributors={[
        generateStatefulContributor(),
        generateStatefulContributor()
      ]}
      contributorsLoading={false}
      connected={false}
    />
  ));
