import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, select } from '@storybook/addon-knobs';
import BackgroundButton from './BackgroundButton';

storiesOf('Components/Atoms/Buttons/BackgroundButton', module)
  .addDecorator(withKnobs)
  .add('normal', () => (
    <BackgroundButton
      dangerouslySetInnerHTML={{ __html: text('content', 'Ajouter') }}
      size={select('Size ?', { normal: 'normal', big: 'big' }, 'normal')}
    />
  ))
  .add('disabled', () => (
    <BackgroundButton
      disabled
      dangerouslySetInnerHTML={{ __html: text('content', 'Ajouter') }}
    />
  ))
  .add('loading', () => <BackgroundButton loading />)
  .add('disabled and loading', () => <BackgroundButton disabled loading />);
