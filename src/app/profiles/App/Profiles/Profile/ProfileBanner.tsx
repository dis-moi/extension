import React from 'react';
import styled from 'styled-components';
import { StatefulContributor } from 'app/lmem/contributor';
import defaultProfileBannerImage from 'assets/img/profile-banner.jpg';

const ProfileBannerContainer = styled.div<{
  default: boolean;
}>`
  position: relative;
  min-height: 300px;
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
        style={{ width: '100%' }}
        src={
          contributor && contributor.banner
            ? contributor.banner
            : defaultProfileBannerImage
        }
        alt={getBannerAlt(contributor)}
      />
    </ProfileBannerContainer>
  );
};

export default ProfileBanner;
