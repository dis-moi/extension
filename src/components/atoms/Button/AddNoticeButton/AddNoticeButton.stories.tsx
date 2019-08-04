import React from 'react';
import { MemoryRouter as Router } from 'react-router';
import { storiesOf } from '@storybook/react';
import AddNoticeButton from './AddNoticeButton';

storiesOf('atoms/Buttons/AddNoticeButton', module)
  .addDecorator(getStory => <Router>{getStory()}</Router>)
  .add('normal', () => <AddNoticeButton />);
