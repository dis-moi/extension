import React from 'react';
import { MemoryRouter as Router } from 'react-router';
import { storiesOf } from '@storybook/react';
import AddNoticeButton from './AddNoticeButton';

storiesOf('Components/Atoms/Buttons', module)
  .addDecorator(getStory => <Router>{getStory()}</Router>)
  .add('AddNoticeButton', () => <AddNoticeButton />);
