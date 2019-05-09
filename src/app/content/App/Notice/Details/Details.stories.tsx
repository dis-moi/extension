import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import Details from '.';

storiesOf('screens/Notice/Details', module)
  .addDecorator(getStory => <Router>{getStory()}</Router>)
  .add('default', () => <Details />);
