import React from 'react';
import { storiesOf } from '@storybook/react';
import ContributorLarge from './ContributorLarge';
import ContributorCompact from './ContributorCompact';

storiesOf('organisms/Contributor', module)
  .add('large', () => <ContributorLarge />)
  .add('compact', () => <ContributorCompact />);
