import React from 'react';
import { storiesOf } from '@storybook/react';
import Profile from './Profile';
import { generateStatefulNotice } from 'test/fakers/generateNotice';
import { generateContributor } from 'test/fakers/generateContributor';

storiesOf('Profile', module).add('Page', () => (
  <Profile
    loading={false}
    fetchContributorNotices={() => {}}
    notices={[generateStatefulNotice()]}
    noticesLoading={false}
    subscribe={() => {}}
    unsubscribe={() => {}}
    contributor={generateContributor()}
  />
));
