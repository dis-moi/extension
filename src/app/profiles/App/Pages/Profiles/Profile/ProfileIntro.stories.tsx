import React, { ReactElement } from 'react';
import { action } from '@storybook/addon-actions';
import { StoryFn } from '@storybook/addons';
import { MemoryRouter as Router } from 'react-router-dom';
import { generateStatefulContributor } from 'test/fakers/generateContributor';
import ProfileIntro from './ProfileIntro';

export default {
  title: 'Profile',
  decorators: [
    (getStory: StoryFn<ReactElement>) => <Router>{getStory()}</Router>
  ]
};

export const _ProfileIntro = () => (
  <ProfileIntro
    unsubscribe={action('unsubscribe')}
    subscribe={action('subscribe')}
    contributor={generateStatefulContributor()}
  />
);

_ProfileIntro.story = {
  name: 'ProfileIntro'
};
