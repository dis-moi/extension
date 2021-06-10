import React from 'react';
import styled from 'styled-components';
import { getPlatform, Platform } from '../../../../utils/website/getPlatform';
import { Browser, getBrowser } from '../../../../utils/website/getBrowser';
import { getIsMobile } from '../../../../utils/website/getIsMobile';
import { getIsBrowserValid } from '../../../../utils/website/getIsBrowserValid';
import Stars from './Stars';

const Text = styled.span`
  display: block;
  padding-top: 10px;
  color: white;
  font-size: 11px;
  font-family: ${props => props.theme.website.fontFamily};
`;

interface Rating {
  env: Platform | Browser;
  feedbackCount: number;
  userCount: number;
  storeName: string;
}

export const getStoreRatings = (): Rating[] => [
  {
    env: 'chrome',
    feedbackCount: 54,
    userCount: 5432,
    storeName: 'Chrome Store'
  },
  {
    env: 'firefox',
    feedbackCount: 78,
    userCount: 3456,
    storeName: 'Firefox Add-ons'
  },
  {
    env: 'android',
    feedbackCount: 23,
    userCount: 4563,
    storeName: 'Play Store'
  },
  {
    env: 'ios',
    feedbackCount: 48,
    userCount: 4876,
    storeName: 'App Store'
  }
];

export interface StoreRatingProps {
  platform?: Platform;
  browser?: Browser;
  storeRatings?: Rating[];
  className?: string;
}

const StoreRating = styled(
  ({ platform, browser, storeRatings, className }: StoreRatingProps) => {
    const currentPlatform = platform || getPlatform;
    const isMobile = getIsMobile(currentPlatform);
    const currentBrowser = browser || getBrowser;
    const isBrowserValid = getIsBrowserValid(currentBrowser);
    if (!isMobile && !isBrowserValid) return null;
    const env = isMobile ? currentPlatform : currentBrowser;
    const currentStoreRatings = storeRatings || getStoreRatings();
    const rating = currentStoreRatings.find(rating => rating.env === env);
    if (!rating) return null;
    return (
      <div className={className}>
        <Stars />
        <Text>
          Déjà <b>{rating.feedbackCount} avis</b> sur {rating.storeName}
          <br />
          <b>{rating.userCount} utilisateurs</b> et c’est pas fini !
        </Text>
      </div>
    );
  }
)``;

export default StoreRating;
