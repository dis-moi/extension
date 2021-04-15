import React from 'react';
import { withKnobs, text } from '@storybook/addon-knobs';
import UserName from './UserName';
import UserNameCompact from './UserNameCompact';
import Faker from 'faker';

const defaultUserName = Faker.name.findName();

export default {
  title: 'Components/Atoms/UserName',
  decorators: [withKnobs]
};

export const Normal = () => (
  <UserName>{text('content', defaultUserName)}</UserName>
);

Normal.story = {
  name: 'normal'
};

export const Compact = () => (
  <UserNameCompact>{text('content', defaultUserName)}</UserNameCompact>
);

Compact.story = {
  name: 'compact'
};
