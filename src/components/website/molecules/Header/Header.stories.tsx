import React from 'react';
import Header, { HeaderProps } from './Header';

export default {
  title: 'Website/Molecules/Header',
  argTypes: {
    scrolled: { control: { type: 'boolean' } }
  }
};

export const HeaderNotScrolled = (args: HeaderProps) => <Header {...args} />;
HeaderNotScrolled.args = {
  scrolled: false
};

export const HeaderScrolled = (args: HeaderProps) => <Header {...args} />;
HeaderScrolled.args = {
  scrolled: true
};
