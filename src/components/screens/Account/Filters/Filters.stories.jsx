import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import theme from '../../../../app/theme';
import Filters from './Filters';

const Global = createGlobalStyle`
  body {
    background-color: grey;
  }
`;

const Wrapper = styled.div`
  width: 384px;
  height: 414px;
`;

storiesOf('screens/Filters', module)
  .addDecorator(getStory => (
    <div>
      <Global />
      <Router>
        <ThemeProvider theme={theme}>
          <Wrapper>
            {getStory()}
          </Wrapper>
        </ThemeProvider>
      </Router>
    </div>
  ))
  .add('normal', () => <Filters />);
