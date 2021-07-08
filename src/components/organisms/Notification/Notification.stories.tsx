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

export const WithNews = () => (
  <Router>
    <Notification
      title="Notification title"
      news={
        '||Avec une news en plus mais long de plusieurs lignes oui de plusieurs lignes  >> Avec une news en plus mais long ]] de plusieurs lignes oui de plusieurs lignes 123Avec une news en plus mais long de plusieurs lignes oui de plusieurs lignes'
      }
    />
  </Router>
);

WithNews.story = {
  name: 'with news'
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
