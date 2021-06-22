import React from 'react';
import TabButton, { TabButtonProps } from './TabButton';

export default {
  title: 'Website/Atoms/TabButton',
  argTypes: {
    color: {
      options: ['blue', 'green', 'orange'],
      control: { type: 'select' },
      default: null
    },
    buttons: {
      control: { type: 'object' }
    }
  }
};

export const _TabButton = (args: TabButtonProps) => <TabButton {...args} />;
_TabButton.args = {
  color: 'green',
  buttons: [
    {
      text: 'Tab 1'
    },
    {
      text: 'Tab 2'
    },
    {
      text: 'Tab 3'
    }
  ]
};
