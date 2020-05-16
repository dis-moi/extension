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

  & > img {
    width: ${props => (props.size === 'small' ? '40px' : '90px')};
    height: auto;
    border-radius: 50%;
  }

  svg {
    width: ${props => (props.size === 'small' ? '25px' : '83px')};
    height: auto;
  }
`;

interface AvatarProps<S = LocationState> {
  contributor: {
    name: string;
    avatar?: AvatarType;
  };
  size: AvatarSize;
  className?: string;
  onClick?: () => void;
  to?: LocationDescriptor<S>;
}

const Avatar = ({ contributor, size, className, onClick, to }: AvatarProps) => (
  <Wrapper size={size} className={className} onClick={onClick} to={to}>
    {contributor.avatar && contributor.avatar[size].url ? (
      <img src={contributor.avatar.normal.url} alt={contributor.name} />
    ) : (
      <AvatarDefault />
    )}
  </Wrapper>
);

export default styled(Avatar)``;
