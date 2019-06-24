import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import SubmitContribution from './';

storiesOf('forms/SubmitContribution', module)
  .addDecorator(getStory => <Router>{getStory()}</Router>)
  .add('normal', () => <SubmitContribution />);
