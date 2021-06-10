import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { StatefulContributor } from 'libs/domain/contributor';
import defaultProfileBannerImage from 'assets/img/profile-banner.png';

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

interface ProfileBannerProps {
  contributor?: StatefulContributor;
}

const ProfileBanner = ({ contributor }: ProfileBannerProps) => {
  const { t } = useTranslation();
  return (
    <ProfileBannerContainer default={!hasBanner(contributor)}>
      <img
        style={{ width: '50%' }}
        src={
          contributor && contributor.banner
            ? contributor.banner
            : defaultProfileBannerImage
        }
        alt={t('profiles:view.profile.banner', {
          contributorName: contributor?.name,
          context: contributor?.name && 'contributor'
        })}
      />
    </ProfileBannerContainer>
  );
};

export default ProfileBanner;
