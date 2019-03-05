import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import React from 'react';
import ContentTitle from '.';

storiesOf('atoms/ContentTitle', module)
  .addDecorator(withKnobs)
  .add('normal', () => <ContentTitle>{text('title', 'Title')}</ContentTitle>);
