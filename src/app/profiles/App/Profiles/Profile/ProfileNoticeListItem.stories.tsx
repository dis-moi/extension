import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import ProfileNoticeListItem from './ProfileNoticeListItem';
import { generateStatefulNotice } from 'test/fakers/generateNotice';

storiesOf('Profile', module).add('ProfileNoticeListItem', () => (
  <ProfileNoticeListItem
    loading={false}
    notice={generateStatefulNotice()}
    seeInContext={action('seeInContext')}
  />
));
