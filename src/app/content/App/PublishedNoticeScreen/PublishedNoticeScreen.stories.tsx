import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { MemoryRouter as Router } from 'react-router-dom';
import PublishedNoticeScreen from '.';

storiesOf('screens/PublishedNotice', module)
  .addDecorator(getStory => <Router>{getStory()}</Router>)
  .add('normal', () => <PublishedNoticeScreen />);
