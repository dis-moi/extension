import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import Avatar from './Avatar';
import Faker from 'faker';

const defaultAvatar = Faker.image.avatar();

storiesOf('atoms/Avatar', module)
  .addDecorator(withKnobs)
  .add('normal', () => <Avatar src={text('content', defaultAvatar)} />);
