import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import Avatar from './Avatar';
import AvatarDefault from '../icons/AvatarDefault';

storiesOf('atoms/Avatar', module)
  .addDecorator(withKnobs)
  .add('normal', () => (
    <Avatar>
      <AvatarDefault />
    </Avatar>
  ));
