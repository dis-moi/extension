import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { MemoryRouter as Router } from 'react-router-dom';
import CreateNoticeScreen from '.';

storiesOf('screens/CreateNoticeScreen', module)
  .addDecorator(getStory => <Router>{getStory()}</Router>)
  .add('normal', () => <CreateNoticeScreen close={action('close')} />)
  .add('error', () => <CreateNoticeScreen close={action('close')} />);
