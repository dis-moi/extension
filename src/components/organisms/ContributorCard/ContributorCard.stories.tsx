import React from 'react';
import { storiesOf } from '@storybook/react';
import ContributorCard from './ContributorCard';
import { generateContributor } from 'test/fakers/generateContributor';

storiesOf('organisms/ContributorCard', module).add('default', () => (
  <ContributorCard contributor={generateContributor()} />
));
