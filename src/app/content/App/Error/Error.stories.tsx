import React, { ReactElement } from 'react';
import { action } from '@storybook/addon-actions';
import { MemoryRouter as Router } from 'react-router';
import { StoryFn } from '@storybook/addons';
import Notification from 'components/organisms/Notification';
import Error from '.';

export default {
  title: 'Extension/Error'
};

export const _Error = () => <Error />;
_Error.decorators = [
  (getStory: StoryFn<ReactElement>) => (
    <Router>
      <Notification close={action('close')}>{getStory()}</Notification>
    </Router>
  )
];
