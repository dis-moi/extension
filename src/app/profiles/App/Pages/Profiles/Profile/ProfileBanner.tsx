import React from 'react';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';
import styled from 'styled-components';
import { StatefulContributor } from 'app/lmem/contributor';
import defaultProfileBannerImage from 'assets/img/profile-banner.jpg';

const ProfileBannerContainer = styled.div<{
  default: boolean;
}>`
  position: relative;
  min-height: 200px;
  background-color: #fff;
  overflow: hidden;

  img {
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    display: block;
    opacity: ${props => (props.default ? '0.5' : '1')};
  }

  @media (max-width: ${props => props.theme.tabletWidth}) {
    min-height: 100px;
    max-height: 200px;

    img {
      position: relative;
    }
  }
`;

const hasBanner = (contributor?: StatefulContributor): boolean =>
  !!contributor && !!contributor.banner;

const getBannerAlt = (t: TFunction, contributor?: StatefulContributor) => {
  if (contributor && contributor.banner) {
    return t('view.profile.banner.with_contributor', {
      contributorName: contributor.name
    });
  }

  return t('view.profile.banner.default');
};

interface ProfileBannerProps {
  contributor?: StatefulContributor;
}

const ProfileBanner = ({ contributor }: ProfileBannerProps) => {
  const { t } = useTranslation();
  return (
    <ProfileBannerContainer default={!hasBanner(contributor)}>
      <img
        style={{ width: '100%' }}
        src={
          contributor && contributor.banner
            ? contributor.banner
            : defaultProfileBannerImage
        }
        alt={getBannerAlt(t, contributor)}
      />
    </ProfileBannerContainer>
  );
};

export default ProfileBanner;
