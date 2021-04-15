import React, { ReactElement } from 'react';
import { MemoryRouter as Router } from 'react-router-dom';

import { StoryFn } from '@storybook/addons';
import { action } from '@storybook/addon-actions';
import Notification from 'src/components/organisms/Notification';
import { Help } from './index';

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
