import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { Arrow, LinkIcon } from '../icons';
import { Anchor, ExternalLink, Link } from './index';

export default {
  title: 'Components/Atoms/ListLinks',
  decorators: [withKnobs]
};

export const _Anchor = () => <Anchor>Link</Anchor>;
export const _Link = () => <Link to="/">Link</Link>;

export const LinkWithIcon = () => (
  <Link to="/">
    Link <Arrow />
  </Link>
);

LinkWithIcon.story = {
  name: 'Link with icon'
};

export const _ExternalLink = () => <ExternalLink>Link</ExternalLink>;

export const ExternalLinkWithIcon = () => (
  <ExternalLink>
    <LinkIcon /> Link
  </ExternalLink>
);

ExternalLinkWithIcon.story = {
  name: 'External Link with icon'
};
