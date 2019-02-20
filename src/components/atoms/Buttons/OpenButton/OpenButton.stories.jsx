import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import theme from '../../../../app/theme';
import OpenButton from './OpenButton';
import 'typeface-lato';
import 'typeface-sedgwick-ave';

const Global = createGlobalStyle`
  body {
    background-color: grey;
  }
`;

storiesOf('atoms/Buttons/OpenButton', module)
  .addDecorator(withKnobs)
  .addDecorator(getStory => (
    <div>
      <Global />
      <ThemeProvider theme={theme}>
        {getStory()}
      </ThemeProvider>
    </div>
  ))
  .add('normal', () => <OpenButton />);
