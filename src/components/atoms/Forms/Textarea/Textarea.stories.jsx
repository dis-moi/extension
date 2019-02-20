import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import theme from '../../../../app/theme';
import Textarea from './Textarea';
import 'typeface-lato';
import 'typeface-sedgwick-ave';

const Global = createGlobalStyle`
  body {
    background-color: grey;
  }
`;

storiesOf('atoms/Forms/Textarea', module)
  .addDecorator(withKnobs)
  .addDecorator(getStory => (
    <div>
      <Global />
      <ThemeProvider theme={theme}>
        {getStory()}
      </ThemeProvider>
    </div>
  ))
  .add('normal', () => <Textarea />);
