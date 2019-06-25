import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import ContributorCard from './ContributorCard';

storiesOf('organisms/ContributorCard', module).add('default', () => (
  <ContributorCard />
));
