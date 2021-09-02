import React from 'react';
import styled from 'styled-components';
import { Platform } from '../../../../utils/website/getPlatform';
import { Browser } from '../../../../utils/website/getBrowser';
import useDefineClientSetup from '../../../../libs/hooks/useDefineClientSetup';
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
    const {
      currentBrowser,
      isBrowserValid,
      currentPlatform,
      isMobile
    } = useDefineClientSetup(browser, platform);

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
)`
  transform-origin: center;
  transform: scale(0.9);
  padding-top: 5px;
  @media (min-width: ${props => props.theme.tabletWidth}) {
    transform: none;
    padding-top: 0;
  }
`;

export default StoreRating;
