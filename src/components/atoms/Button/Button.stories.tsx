import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import Button from './Button';

storiesOf('Components/Atoms/Buttons/Button', module)
  .addDecorator(withKnobs)
  .add('normal', () => (
    <Button dangerouslySetInnerHTML={{ __html: text('content', 'Ajouter') }} />
  ))
  .add('disabled', () => (
    <Button
      disabled
      dangerouslySetInnerHTML={{ __html: text('content', 'Ajouter') }}
    />
  ))
  .add('loading', () => <Button loading />)
  .add('disabled and loading', () => <Button loading />);
