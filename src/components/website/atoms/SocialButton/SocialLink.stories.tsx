import React from 'react';
import SocialLink, { SocialLinkProps } from './SocialLink';

export default {
  title: 'Website/Atoms/SocialLink',
  argTypes: {
    icon: {
      options: ['facebook', 'github', 'linkedin', 'mastodon', 'twitter'],
      control: { type: 'select' },
      default: null
    },
    title: {
      control: { type: 'text' }
    },
    href: {
      control: { type: 'text' }
    }
  }
};

export const SocialLinkMastodon = (args: SocialLinkProps) => (
  <SocialLink {...args} />
);
SocialLinkMastodon.args = {
  icon: 'mastodon',
  title: 'Suivez-nous sur Mastodon',
  href: '#'
} as SocialLinkProps;

export const SocialLinkFacebook = (args: SocialLinkProps) => (
  <SocialLink {...args} />
);
SocialLinkFacebook.args = {
  icon: 'facebook',
  title: 'Suivez-nous sur Facebook',
  href: 'https://www.facebook.com/DisMoiCompagnon'
} as SocialLinkProps;

export const SocialLinkGitHub = (args: SocialLinkProps) => (
  <SocialLink {...args} />
);
SocialLinkGitHub.args = {
  icon: 'github',
  title: 'Suivez-nous sur GitHub',
  href: 'https://github.com/dis-moi'
} as SocialLinkProps;

export const SocialLinkLinkedIn = (args: SocialLinkProps) => (
  <SocialLink {...args} />
);
SocialLinkLinkedIn.args = {
  icon: 'linkedin',
  title: 'Suivez-nous sur LinkedIn',
  href: 'https://www.linkedin.com/company/dismoi/mycompany/'
} as SocialLinkProps;

export const SocialLinkTwitter = (args: SocialLinkProps) => (
  <SocialLink {...args} />
);
SocialLinkTwitter.args = {
  icon: 'twitter',
  title: 'Suivez-nous sur Twitter',
  href: 'https://twitter.com/dismoicompagnon'
} as SocialLinkProps;

export const AllSocialLink = () => (
  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
    <SocialLinkMastodon {...SocialLinkMastodon.args} />
    <SocialLinkFacebook {...SocialLinkFacebook.args} />
    <SocialLinkGitHub {...SocialLinkGitHub.args} />
    <SocialLinkLinkedIn {...SocialLinkLinkedIn.args} />
    <SocialLinkTwitter {...SocialLinkTwitter.args} />
  </div>
);
