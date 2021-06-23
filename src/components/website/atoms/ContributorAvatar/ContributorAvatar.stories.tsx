import React from 'react';
import ContributorAvatar, { ProfileImageLinkProps } from './ContributorAvatar';

export default {
  title: 'Website/Atoms/ContributorAvatar',
  argTypes: {
    imageUrl: { control: { type: 'text' } }
  }
};

export const _ProfileImageLink = (args: ProfileImageLinkProps) => (
  <ContributorAvatar {...args} />
);
_ProfileImageLink.args = {
  imageUrl:
    'https://notices.bulles.fr/media/cache/xl_thumb/uploads/avatars/nbpoD7h1vH.png'
};
