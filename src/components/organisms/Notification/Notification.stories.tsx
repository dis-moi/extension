import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { action } from '@storybook/addon-actions';
import Notification from '.';

export default {
  title: 'Components/Organisms/Notification'
};

export const Normal = () => (
  <Router>
    <Notification />
  </Router>
);

Normal.story = {
  name: 'normal'
};

export const WithTitle = () => (
  <Router>
    <Notification title="Notification title" />
  </Router>
);

WithTitle.story = {
  name: 'with title'
};

export const WithLongTitle = () => (
  <Router>
    <Notification title="Very long notification title, it should break" />
  </Router>
);

WithLongTitle.story = {
  name: 'with long title'
};

export const WithNav = () => (
  <Router initialIndex={2} initialEntries={['/path', '/pass']}>
    <Notification
      title="Very long notification title, it should break"
      onBack={action('handleGoBack')}
    />
  </Router>
);

WithNav.story = {
  name: 'with nav'
};
