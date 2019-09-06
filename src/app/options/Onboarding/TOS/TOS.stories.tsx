import React from 'react';
import { MemoryRouter as Router, Route } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import TOS from './TOS';

storiesOf('screens/Onboarding', module)
  .addDecorator(getStory => <Router>{getStory()}</Router>)
  .add('ToS', () => <Route component={TOS} />);
