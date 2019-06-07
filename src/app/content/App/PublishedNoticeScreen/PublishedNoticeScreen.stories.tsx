import React from 'react';
import { MemoryRouter as Router } from 'react-router';
import { storiesOf } from '@storybook/react';
import Error from '.';

storiesOf('screens/Error', module).add('normal', () => (
  <Router>
    <Error />
  </Router>
));
