import React from 'react'
import { MemoryRouter as Router } from 'react-router-dom'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'
import theme from '../../../../theme'
import List from './List'

const Global = createGlobalStyle`
  body {
    background-color: grey;
  }
`

const Wrapper = styled.div`
  width: 384px;
  height: 414px;
`

const notices = [
  {
    id: '123',
    description: 'Description',
    title: 'title',
    contributor: { name: 'John Doe' },
    criteria: [{ label: 'label', slug: 'slug' }],
    isApproved: true,
    isDismissed: false,
    resource: {
      author: 'Jack Daniels',
      editor: 'LMEM',
      label: 'label',
      url: 'url',
    },
    alternatives: [{
      label: 'some alternative',
      url_to_redirect: 'url'
    }]
  }
]

storiesOf('screens/Notice/List', module)
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
  .add('with 1 notification', () => (
    <List close={action('close')} dismiss={action('dismiss')} notices={notices} />
  ))
  .add('empty list', () => (
    <List close={action('close')} dismiss={action('dismiss')} notices={[]} />
  ))
