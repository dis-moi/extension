import React from 'react'
import { MemoryRouter as Router } from 'react-router-dom'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'
import theme from '../../app/theme'
import Loading from './Loading'

const Global = createGlobalStyle`
  body {
    background-color: grey;
  }
`

const Wrapper = styled.div`
  width: 384px;
  height: 414px;
`

storiesOf('screens/About', module)
  .addDecorator(getStory => (
    <div>
      <Global/>
      <Router>
        <ThemeProvider theme={theme}>
          <Wrapper>
            {getStory()}
          </Wrapper>
        </ThemeProvider>
      </Router>
    </div>
  ))
  .add('normal', () => <Loading close={action('close')} />);
