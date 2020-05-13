import React from 'react';
import { storiesOf } from '@storybook/react';
import ProfileNoticeListItem from './ProfileNoticeListItem';
import { generateStatefulNotice } from 'test/fakers/generateNotice';

storiesOf('Profile', module).add('ProfileNotice', () => (
  <ProfileNoticeListItem notice={generateStatefulNotice()} />
));
