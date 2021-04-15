import React, { ReactElement } from 'react';
import { MemoryRouter as Router } from 'react-router';
import { StoryFn } from '@storybook/addons';
import AddNoticeButton from './AddNoticeButton';

export default {
  title: 'Components/Atoms/Buttons/AddNotice',
  decorators: [
    (getStory: StoryFn<ReactElement>) => <Router>{getStory()}</Router>
  ]
};

export const _AddNoticeButton = () => <AddNoticeButton />;

_AddNoticeButton.story = {
  name: 'AddNoticeButton'
};
