import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Profile from './Profile';
import { generateStatefulNotice } from 'test/fakers/generateNotice';
import { generateStatefulContributor } from 'test/fakers/generateContributor';

storiesOf('Profile', module).add('Page', () => (
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
));
