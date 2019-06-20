import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import ContributorNav from './ContributorNav';

storiesOf('organisms/ContributorNav', module).add('default', () => (
  <ContributorNav />
));
