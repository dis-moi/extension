import React from 'react';
import { storiesOf } from '@storybook/react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import theme from '../../../../app/theme';
import AddNoticeLink from './AddNoticeLink';
import 'typeface-lato';
import 'typeface-sedgwick-ave';

const Global = createGlobalStyle`
  body {
    background-color: grey;
  }
`;

storiesOf('atoms/Buttons/AddNoticeLink', module)
  .addDecorator(getStory => (
    <div>
      <Global />
      <ThemeProvider theme={theme}>
        {getStory()}
      </ThemeProvider>
    </div>
  ))
  .add('normal', () => <AddNoticeLink />);
