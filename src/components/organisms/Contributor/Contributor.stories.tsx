import React from 'react';
import { storiesOf } from '@storybook/react';
import ContributorLarge from './ContributorLarge';
import ContributorCompact from './ContributorCompact';
import { generateContributor } from '../../../../test/fakers/generateContributor';

storiesOf('organisms/Contributor', module)
  .add('large', () => <ContributorLarge contributor={generateContributor()} />)
  .add('compact', () => <ContributorCompact />);
