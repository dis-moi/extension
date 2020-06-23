import React from 'react';
import { StatefulContributor } from 'app/lmem/contributor';
import styled from 'styled-components';

const ProfileBannerContainer = styled.div<{
  default: boolean;
}>`
  min-height: 200px;
  background-color: ${props => props.theme.navInactive};

  img {
    display: block;
    opacity: ${props => (props.default ? '0.5' : '1')};
  }
`;

const hasBanner = (contributor?: StatefulContributor): boolean =>
  !!contributor && !!contributor.banner;

const getBannerAlt = (contributor?: StatefulContributor) => {
  if (contributor && contributor.banner) {
    return `Bannière de ${contributor.name}`;
  }

  return `Bannière par default`;
};

interface ProfileBannerProps {
  contributor?: StatefulContributor;
}

const ProfileBanner = ({ contributor }: ProfileBannerProps) => {
  return (
    <ProfileBannerContainer default={!hasBanner(contributor)}>
      <img
        src={
          contributor && contributor.banner
            ? contributor.banner
            : '/img/profile-banner.jpg'
        }
        alt={getBannerAlt(contributor)}
      />
    </ProfileBannerContainer>
  );
};

export default ProfileBanner;
