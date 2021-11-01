import React from 'react';
import { browserList } from '../../../../utils/website/getBrowser';
import { platformList } from '../../../../utils/website/getPlatform';
import CTAButton, { CATButtonProps } from './CTAButton';

export default {
  title: 'Website/Atoms/CATButton',
  argTypes: {
    platform: {
      options: platformList,
      control: { type: 'select' },
      default: null
    },
    browser: {
      options: browserList,
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

export const CATButtonAutoDetect = (args: CATButtonProps) => (
  <CTAButton {...args} />
);

export const CATButtonFirefox = (args: CATButtonProps) => (
  <CTAButton {...args} />
);
CATButtonFirefox.args = {
  browser: 'firefox'
};

export const CATButtonChrome = (args: CATButtonProps) => (
  <CTAButton {...args} />
);
CATButtonChrome.args = {
  browser: 'chrome'
};

export const CATButtonAndroid = (args: CATButtonProps) => (
  <CTAButton {...args} />
);
CATButtonAndroid.args = {
  platform: 'android'
};

export const CATButtonIos = (args: CATButtonProps) => <CTAButton {...args} />;
CATButtonIos.args = {
  platform: 'ios'
};

export const CATButtonNotSupported = (args: CATButtonProps) => (
  <CTAButton {...args} />
);
CATButtonNotSupported.args = {
  browser: 'brave'
};
