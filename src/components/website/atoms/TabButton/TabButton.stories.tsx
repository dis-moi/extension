import React, { ReactElement } from 'react';
import { StoryFn } from '@storybook/addons';
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
    },
    activeIndex: {
      control: { type: 'number' }
    }
  },
  decorators: [
    (getStory: StoryFn<ReactElement>) => (
      <div
        style={{
          margin: '-1rem',
          padding: '1rem',
          background: 'white',
          height: 'calc(100vh - 2rem)'
        }}
      >
        <>{getStory()}</>
      </div>
    )
  ]
};

const examplesButtons = [
  {
    text: 'Tab 1',
    // eslint-disable-next-line no-console
    handleClick: () => console.log('Click on tab 1!')
  },
  {
    text: 'Tab 2',
    // eslint-disable-next-line no-console
    handleClick: () => console.log('Click on tab 2!')
  },
  {
    text: 'Tab 3',
    // eslint-disable-next-line no-console
    handleClick: () => console.log('Click on tab 3!')
  }
];

export const _TabButton = (args: TabButtonProps) => <TabButton {...args} />;
_TabButton.args = {
  buttons: examplesButtons
};

export const TabButtonBlue = (args: TabButtonProps) => <TabButton {...args} />;
TabButtonBlue.args = {
  color: 'blue',
  buttons: examplesButtons,
  activeIndex: 0
};

export const TabButtonGreen = (args: TabButtonProps) => <TabButton {...args} />;
TabButtonGreen.args = {
  color: 'green',
  buttons: examplesButtons,
  activeIndex: 1
};

export const TabButtonOrange = (args: TabButtonProps) => (
  <TabButton {...args} />
);
TabButtonOrange.args = {
  color: 'orange',
  buttons: examplesButtons,
  activeIndex: 2
};
