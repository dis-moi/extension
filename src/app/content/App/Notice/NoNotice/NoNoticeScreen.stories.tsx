import React, { ReactElement } from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { StoryFn } from '@storybook/addons';
import Notification from 'components/organisms/Notification';
import { formStoreDecorator } from '../../../../../../.storybook/decorators';
import NoNoticeScreen from './NoNoticeScreen';

export default {
  title: 'Extension/Notice'
};

export const NoNotice = () => <NoNoticeScreen />;

NoNotice.story = {
  name: 'NoNotice'
};

NoNotice.decorators = [
  formStoreDecorator,
  (getStory: StoryFn<ReactElement>) => (
    <Router>
      <Notification>{getStory()}</Notification>
    </Router>
  )
];
