import React from 'react';
import styled from 'styled-components';
import IconMastodon from './icons/IconMastodon';
import IconGitHub from './icons/IconGitHub';
import IconLinkedIn from './icons/IconLinkedIn';
import IconTwitter from './icons/IconTwitter';
import IconFacebook from './icons/IconFacebook';

export type SocialLinkIcon =
  | 'mastodon'
  | 'github'
  | 'linkedin'
  | 'twitter'
  | 'facebook';

const IconSvg = (icon: SocialLinkIcon) => {
  if (icon === 'mastodon') return <IconMastodon />;
  if (icon === 'github') return <IconGitHub />;
  if (icon === 'linkedin') return <IconLinkedIn />;
  if (icon === 'twitter') return <IconTwitter />;
  if (icon === 'facebook') return <IconFacebook />;
};

export interface SocialLinkProps {
  className?: string;
  icon?: SocialLinkIcon;
  title: string;
  href: string;
}

const SocialLink = styled(
  ({ className, icon, title, href }: SocialLinkProps) => (
    <a
      className={className}
      title={title}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {icon && IconSvg(icon)}
    </a>
  )
)`
  display: block;
  height: 35px;
  width: 35px;
  background-color: white;
  border-radius: 50%;
  @media (min-width: ${props => props.theme.tabletWidth}) {
    height: 40px;
    width: 40px;
  }
  &:hover {
    background-color: ${props => props.theme.website.secondaryColor};
    svg path {
      fill: white;
    }
  }
  &:active {
    background-color: ${props => props.theme.website.activeColor};
  }
  + a {
    margin-left: 5px;
  }
`;

export default SocialLink;
