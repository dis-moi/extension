import React from 'react';
import styled from 'styled-components';
import { AvatarSize, Avatar as AvatarType } from 'app/lmem/contributor';
import AvatarDefault from 'components/atoms/icons/AvatarDefault';

interface WrapperProps {
  size: AvatarSize;
}

const Wrapper = styled.div<WrapperProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  width: ${props => (props.size === 'small' ? '40px' : '60px')};
  height: ${props => (props.size === 'small' ? '40px' : '60px')};
  background-color: ${props => props.theme.contributorGrey};
  border-radius: 50%;

  & > img {
    width: ${props => (props.size === 'small' ? '40px' : '60px')};
    height: auto;
    border-radius: 50%;
  }

  svg {
    width: ${props => (props.size === 'small' ? '25px' : '53px')};
    height: auto;
  }
`;

interface AvatarProps {
  contributor: {
    name: string;
    avatar?: AvatarType;
  };
  size: AvatarSize;
  className?: string;
  onClick?: () => void;
}

const Avatar = ({ contributor, size, className, onClick }: AvatarProps) => (
  <Wrapper size={size} className={className} onClick={onClick}>
    {contributor.avatar && contributor.avatar[size].url ? (
      <img src={contributor.avatar.normal.url} alt={contributor.name} />
    ) : (
      <AvatarDefault />
    )}
  </Wrapper>
);

export default styled(Avatar)``;
