import React, { ReactElement } from 'react';
import { MemoryRouter as Router, Route } from 'react-router-dom';
import { action } from '@storybook/addon-actions';
import Notification from 'src/components/organisms/Notification';
import { About } from './About';
import { Menu } from './Menu';
import { Filters } from './Filters/Filters';
import { StoryFn } from '@storybook/addons';

export default {
  title: 'Extension/Account',
  component: About,
  decorators: [
    (getStory: StoryFn<ReactElement>) => (
      <Router>
        <Notification close={action('close')}>{getStory()}</Notification>
      </Router>
    )
  ]
};

export const _About = () => (
  <About extensionVersion="1.2.3" installationDate={new Date()} />
);
export const _Menu = () => <Route component={Menu} />;
export const _Filters = () => <Filters />;
