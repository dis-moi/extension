import React from 'react';
import { MemoryRouter as Router, Route } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import Examples from './Examples';

storiesOf('screens/Onboarding', module)
  .addDecorator(getStory => <Router>{getStory()}</Router>)
  .add('Examples', () => <Route component={Examples} />);
