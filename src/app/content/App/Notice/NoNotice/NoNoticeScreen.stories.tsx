import React, { ReactElement } from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { StoryFn } from '@storybook/addons';
import Notification from 'components/organisms/Notification';
import NoNoticeScreen from './NoNoticeScreen';

export default {
  title: 'Extension/Notice',

  decorators: [
    (getStory: StoryFn<ReactElement>) => (
      <Router>
        <Notification>{getStory()}</Notification>
      </Router>
    )
  ]
};

export const NoNotice = () => <NoNoticeScreen />;

NoNotice.story = {
  name: 'NoNotice'
};
