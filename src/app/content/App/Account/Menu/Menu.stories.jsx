import React from 'react';
import { MemoryRouter as Router, Route } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import Menu from '.';

storiesOf('screens/Menu', module)
  .add('Menu', () => (
    <Router location="/" context={{}}>
      <Route render={Menu} />
    </Router>
  ));
