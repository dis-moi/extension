import React from 'react';
import { storiesOf } from '@storybook/react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import theme from '../../../../app/theme';
import BorderButton from './BorderButton';
import 'typeface-lato';
import 'typeface-sedgwick-ave';

const Global = createGlobalStyle`
  body {
    background-color: grey;
  }
`;

storiesOf('atoms/Buttons/BorderButton', module)
  .addDecorator(getStory => (
    <div>
      <Global />
      <ThemeProvider theme={theme}>
        {getStory()}
      </ThemeProvider>
    </div>
  ))
  .add('normal', () => <BorderButton>Ajouter</BorderButton>);
 