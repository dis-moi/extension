import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import BorderButton from './BorderButton';

storiesOf('atoms/Buttons/BorderButton', module)
  .addDecorator(withKnobs)
  .add('normal', () => (
    <BorderButton
      dangerouslySetInnerHTML={{ __html: text('content', 'Ajouter') }}
    />
  ));
