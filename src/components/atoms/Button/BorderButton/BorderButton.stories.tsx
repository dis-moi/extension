import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import BorderButton from './BorderButton';

storiesOf('Components/Atoms/Buttons/BorderButton', module)
  .addDecorator(withKnobs)
  .add('normal', () => (
    <BorderButton
      dangerouslySetInnerHTML={{ __html: text('content', 'Ajouter') }}
    />
  ))
  .add('disabled', () => (
    <BorderButton
      dangerouslySetInnerHTML={{ __html: text('content', 'Ajouter') }}
      disabled
    />
  ))
  .add('loading', () => <BorderButton loading>Ajouter</BorderButton>)
  .add('disabled and loading', () => (
    <BorderButton loading disabled>
      Ajouter
    </BorderButton>
  ));
