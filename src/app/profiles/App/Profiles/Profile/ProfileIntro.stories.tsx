import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import ProfileIntro from './ProfileIntro';
import { generateContributor } from 'test/fakers/generateContributor';

storiesOf('Profile', module).add('ProfileIntro', () => (
  <ProfileIntro
    unsubscribe={action('unsubscribe')}
    subscribe={action('subscribe')}
    contributor={generateContributor()}
  />
));
