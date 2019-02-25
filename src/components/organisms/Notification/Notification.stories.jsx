import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Notification from './Notification';

storiesOf('organisms/Notification', module)
  .addDecorator(getStory => (
    <Router>
      {getStory()}
    </Router>
  ))
  .add('normal', () => (
    <Notification />
  ))
  .add('with title', () => (
    <Notification
      title="Notification title"
    />
  ))
  .add('with long title', () => (
    <Notification
      title="Very long notification title, it should break"
    />
  ))
  .add('with nav', () => (
    <Notification
      title="Notification title"
      onBack={action('handleGoBack')}
    >
    Need help to add back button
    </Notification>
  ));
