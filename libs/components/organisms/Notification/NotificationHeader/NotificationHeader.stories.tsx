import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { action } from '@storybook/addon-actions';
import NotificationHeader from './index';

export default {
  title: 'Components/Molecules/NotificationHeader'
};

export const Normal = () => (
  <Router>
    <NotificationHeader close={action('close')} />
  </Router>
);

Normal.story = {
  name: 'normal'
};

export const WithTitle = () => (
  <Router>
    <NotificationHeader title="title" close={action('close')} />
  </Router>
);

WithTitle.story = {
  name: 'with title'
};

export const WithLongTitle = () => (
  <Router>
    <NotificationHeader
      title="Very long notification title, it should breaktitle"
      close={action('close')}
    />
  </Router>
);

WithLongTitle.story = {
  name: 'with long title'
};

export const WithNavHistory = () => (
  <Router initialIndex={2} initialEntries={['/path', '/pass']}>
    <NotificationHeader title="title" close={action('close')} />
  </Router>
);

WithNavHistory.story = {
  name: 'with nav history'
};
