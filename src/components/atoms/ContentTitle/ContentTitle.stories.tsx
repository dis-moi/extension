import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import React from 'react';
import ContentTitle from '.';

storiesOf('Components/Atoms/ContentTitle', module)
  .addDecorator(withKnobs)
  .add('normal', () => <ContentTitle>{text('title', 'Title')}</ContentTitle>);
