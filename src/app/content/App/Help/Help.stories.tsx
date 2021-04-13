import React, { ReactElement } from 'react';
import { MemoryRouter as Router } from 'react-router-dom';

import { StoryFn } from '@storybook/addons';
import { action } from '@storybook/addon-actions';
import { Help } from '.';
import Notification from 'components/organisms/Notification';

export default {
  title: 'Extension/Help'
};

export const _Help = () => <Help />;
_Help.decorators = [
  (getStory: StoryFn<ReactElement>) => (
    <Router>
      <Notification close={action('close')}>{getStory()}</Notification>
    </Router>
  )
];
