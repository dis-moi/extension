import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Notification from 'components/organisms/Notification';
import ContributorScreen from './ContributorScreen';
import { MemoryRouter as Router } from 'react-router';
import { generateContributor } from 'test/fakers/generateContributor';

storiesOf('Extension', module)
  .addDecorator(getStory => (
    <Router>
      <Notification close={action('close')}>{getStory()}</Notification>
    </Router>
  ))
  .add('Contributor', () => (
    <ContributorScreen
      contributor={generateContributor()}
      subscribe={action('subscribe')}
      unsubscribe={action('unsubscribe')}
    />
  ));
