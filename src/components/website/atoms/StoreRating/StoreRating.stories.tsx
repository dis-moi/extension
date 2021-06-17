import React from 'react';
import { platformList } from '../../../../utils/website/getPlatform';
import { browserList } from '../../../../utils/website/getBrowser';
import StoreRating, { getStoreRatings, StoreRatingProps } from './StoreRating';

export default {
  title: 'Website/Atoms/StoreRating',
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
    storeRatings: {
      control: { type: 'object' }
    }
  }
};

export const StoreRatingAutoDetect = (args: StoreRatingProps) => (
  <StoreRating {...args} />
);
StoreRatingAutoDetect.args = {
  storeRatings: getStoreRatings()
};

export const StoreRatingFirefox = (args: StoreRatingProps) => (
  <StoreRating {...args} />
);
StoreRatingFirefox.args = {
  storeRatings: getStoreRatings(),
  browser: 'firefox'
};

export const StoreRatingChrome = (args: StoreRatingProps) => (
  <StoreRating {...args} />
);
StoreRatingChrome.args = {
  storeRatings: getStoreRatings(),
  browser: 'chrome'
};

export const StoreRatingAndroid = (args: StoreRatingProps) => (
  <StoreRating {...args} />
);
StoreRatingAndroid.args = {
  storeRatings: getStoreRatings(),
  platform: 'android'
};

export const StoreRatingIos = (args: StoreRatingProps) => (
  <StoreRating {...args} />
);
StoreRatingIos.args = {
  storeRatings: getStoreRatings(),
  platform: 'ios'
};

export const StoreRatingNotSupported = (args: StoreRatingProps) => (
  <StoreRating {...args} />
);
StoreRatingNotSupported.args = {
  storeRatings: getStoreRatings(),
  browser: 'brave'
};
