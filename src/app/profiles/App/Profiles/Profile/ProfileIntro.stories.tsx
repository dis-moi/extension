import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import ProfileIntro from './ProfileIntro';
import { generateStatefulContributor } from 'test/fakers/generateContributor';
import { MemoryRouter as Router } from 'react-router-dom';

storiesOf('Profile', module)
  .addDecorator(getStory => <Router>{getStory()}</Router>)
  .add('ProfileIntro', () => (
    <ProfileIntro
      unsubscribe={action('unsubscribe')}
      subscribe={action('subscribe')}
      contributor={generateStatefulContributor()}
    />
  ));
