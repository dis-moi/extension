import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import BackgroundButton from './BackgroundButton';

storiesOf('atoms/Button/BackgroundButton', module)
  .addDecorator(withKnobs)
  .add('normal', () => (
    <BackgroundButton
      dangerouslySetInnerHTML={{ __html: text('content', 'Ajouter') }}
    />
  ));
