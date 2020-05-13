import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Popin from './Popin';

storiesOf('Components/Molecules/Popin', module).add('default', () => (
  <Popin opened={true} setOpened={action('setOpened')}>
    Hello world!
  </Popin>
));
