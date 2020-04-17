import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import Stat from './Stat';
import StatType from './StatType';

storiesOf('Components/Atoms/Stat', module)
  .addDecorator(withKnobs)
  .add('Bulles', () => (
    <Stat>
      120 <StatType>contributions</StatType>
    </Stat>
  ))
  .add('J aime', () => (
    <Stat>
      430 <StatType>J&apos;aime</StatType>
    </Stat>
  ))
  .add('Abonnés', () => (
    <Stat>
      3.2K <StatType>Abonnés</StatType>
    </Stat>
  ));
