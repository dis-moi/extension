import React from 'react';
import { LocationDescriptor, LocationState } from 'history';
import styled from 'styled-components';
import { AvatarSize, Avatar as AvatarType } from 'app/lmem/contributor';
import AvatarDefault from 'components/atoms/icons/AvatarDefault';
import Link from 'components/atoms/Link';

interface WrapperProps {
  size: AvatarSize;
}

const Wrapper = styled(Link)<WrapperProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  width: ${props => (props.size === 'small' ? '40px' : '90px')};
  height: ${props => (props.size === 'small' ? '40px' : '90px')};
  background-color: ${props => props.theme.contributorGrey};
  border-radius: 50%;
  font-weight: normal;
  text-decoration: none;

  & > img {
    width: ${props => (props.size === 'small' ? '40px' : '90px')};
    height: auto;
    border-radius: 50%;
  }

  svg {
    width: ${props => (props.size === 'small' ? '25px' : '53px')};
    height: auto;
  }
`;

interface AvatarProps<S = LocationState> {
  contributor?: {
    name: string;
    avatar?: AvatarType;
  };
  size: AvatarSize;
  className?: string;
  onClick?: () => void;
  to?: LocationDescriptor<S>;
  loading?: boolean;
}

const getUrlForSize = (
  contributor: {
    avatar?: AvatarType;
  },
  size: AvatarSize
): string | undefined => {
  if (size === 'large') return contributor.avatar?.large.url;
  if (size === 'normal') return contributor.avatar?.normal.url;
  return contributor.avatar?.small.url;
};

const Avatar = ({
  contributor,
  size,
  className,
  onClick,
  to,
  loading
}: AvatarProps) => {
  const url = contributor ? getUrlForSize(contributor, size) : '';
  return (
    <Wrapper size={size} className={className} onClick={onClick} to={to}>
      {!loading && url ? (
        <img src={url} alt={contributor?.name} />
      ) : (
        <AvatarDefault />
      )}
    </Wrapper>
  );
};

export default styled(Avatar)``;
