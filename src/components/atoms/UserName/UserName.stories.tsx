import React from 'react';
import { withKnobs, text } from '@storybook/addon-knobs';
import Faker from 'faker';
import UserName from './UserName';
import UserNameCompact from './UserNameCompact';

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
