import React from 'react';
import { StaticRouter } from 'react-router';
import { storiesOf } from '@storybook/react';
import AddNoticeLink from './AddNoticeLink';

storiesOf('atoms/Buttons/AddNoticeLink', module)
  .addDecorator(getStory => <StaticRouter>{getStory()}</StaticRouter>)
  .add('normal', () => <AddNoticeLink />);
