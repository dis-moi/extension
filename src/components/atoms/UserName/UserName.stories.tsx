import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import UserName from './UserName';
import Faker from 'faker';

const defaultUserName = Faker.name.findName();

storiesOf('Components/Atoms/UserName', module)
  .addDecorator(withKnobs)
  .add('normal', () => <UserName>{text('content', defaultUserName)}</UserName>);
