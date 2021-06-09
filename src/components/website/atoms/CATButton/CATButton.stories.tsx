import React from 'react';
import CATButton, { CATButtonProps } from './CATButton';

export default {
  title: 'Website/Atoms/CATButton',
  argTypes: {
    platform: {
      options: ['macos', 'ios', 'windows', 'android', 'linux'],
      control: { type: 'select' },
      default: null
    },
    browser: {
      options: ['firefox', 'chrome', 'safari', 'edge', 'brave'],
      control: { type: 'select' },
      default: null
    },
    text: {
      control: { type: 'text' }
    },
    details: {
      control: { type: 'text' }
    }
  }
};

export const CATButtonDefault = (args: CATButtonProps) => (
  <CATButton {...args} />
);

export const CATButtonFirefox = (args: CATButtonProps) => (
  <CATButton {...args} />
);
CATButtonFirefox.args = {
  browser: 'firefox'
};

export const CATButtonChrome = (args: CATButtonProps) => (
  <CATButton {...args} />
);
CATButtonChrome.args = {
  browser: 'chrome'
};

export const CATButtonAndroid = (args: CATButtonProps) => (
  <CATButton {...args} />
);
CATButtonAndroid.args = {
  platform: 'android'
};

export const CATButtonIos = (args: CATButtonProps) => <CATButton {...args} />;
CATButtonIos.args = {
  platform: 'ios'
};
