import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import Stat from './Stat';
import StatType from './StatType';

storiesOf('atoms/Stat', module)
  .addDecorator(withKnobs)
  .add('Bulles', () => (
    <Stat>
      120 <StatType>Bulles</StatType>
    </Stat>
  ))
  .add('J aime', () => (
    <Stat>
      430 <StatType>J'aime</StatType>
    </Stat>
  ))
  .add('Abonnés', () => (
    <Stat>
      3.2K <StatType>Abonnés</StatType>
    </Stat>
  ));
