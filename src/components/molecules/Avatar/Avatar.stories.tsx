import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import Avatar from './Avatar';
import { generateContributor } from 'test/fakers/generateContributor';

storiesOf('Components/Molecules/Avatar', module)
  .addDecorator(withKnobs)
  .add('normal', () => (
    <Avatar contributor={generateContributor()} size="normal" />
  ))
  .add('empty', () => (
    <Avatar
      contributor={generateContributor({ noAvatar: true })}
      size="normal"
    />
  ))
  .add('small', () => (
    <Avatar contributor={generateContributor()} size="small" />
  ))
  .add('small empty', () => (
    <Avatar
      contributor={generateContributor({ noAvatar: true })}
      size="small"
    />
  ));
