import React from 'react';
import { MemoryRouter as Router, Route } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import Subscribe from '../Subscribe';

storiesOf('screens/Onboarding', module)
  .addDecorator(getStory => <Router>{getStory()}</Router>)
  .add('Subscribe', () => <Route component={Subscribe} />);
