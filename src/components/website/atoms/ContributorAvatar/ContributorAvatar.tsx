import styled from 'styled-components';
import React from 'react';

const Link = styled.a`
  display: block;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  box-shadow: ${props => props.theme.website.boxShadow};
  background-color: white;
  background-size: cover;
`;

export interface ProfileImageLinkProps {
  className?: string;
  imageUrl: string;
  name: string;
}

const ContributorAvatar = styled(
  ({ className, name }: ProfileImageLinkProps) => (
    <Link className={className} href={'#'} title={name} />
  )
)`
  background-image: url(${props => props.imageUrl});
`;

export default ContributorAvatar;
