import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Notification from './Notification';

storiesOf('organisms/Notification', module)
  .add('normal', () => (
    <Router>
      <Notification />
    </Router>
  ))
  .add('with title', () => (
    <Router>
      <Notification
        title="Notification title"
      />
    </Router>
  ))
  .add('with long title', () => (
    <Router>
      <Notification
        title="Very long notification title, it should break"
      />
    </Router>
  ))
  .add('with nav', () => (
    <Router initialIndex={2} initialEntries={['/path', '/pass']}>
      <Notification
        title="Very long notification title, it should break"
        onBack={action('handleGoBack')}
      />
    </Router>
  ));
