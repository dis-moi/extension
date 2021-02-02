import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { Anchor, ExternalLink, Link } from './index';
import { Arrow, LinkIcon } from '../icons';

storiesOf('Components/Atoms/Links', module)
  .addDecorator(withKnobs)
  .add('Anchor', () => <Anchor>Link</Anchor>)
  .add('Link', () => <Link to="/">Link</Link>)
  .add('Link with icon', () => (
    <Link to="/">
      <>
        Link <Arrow />
      </>
    </Link>
  ))
  .add('External Link', () => <ExternalLink>Link</ExternalLink>)
  .add('External Link with icon', () => (
    <ExternalLink>
      <LinkIcon /> Link
    </ExternalLink>
  ));
