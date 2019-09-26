import React from 'react';
import styled from 'styled-components';
import { Contributor, AvatarSize } from 'app/lmem/contributor';
import AvatarDefault from '../../atoms/icons/AvatarDefault';

interface WrapperProps {
  size: AvatarSize;
}

const Wrapper = styled.div<WrapperProps>`
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
    width: ${props => (props.size === 'small' ? '25px' : '53px')};
    height: auto;
  }
`;

interface Props {
  contributor: Contributor;
  size: AvatarSize;
  className?: string;
}

const Avatar = styled(({ contributor, size, className }: Props) => (
  <Wrapper size={size} className={className}>
    {contributor.avatar && contributor.avatar[size].url ? (
      <img src={contributor.avatar.normal.url} alt={contributor.name} />
    ) : (
      <AvatarDefault />
    )}
  </Wrapper>
))``;

export default Avatar;
