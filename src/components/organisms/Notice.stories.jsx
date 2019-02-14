import React from 'react'
import { MemoryRouter as Router } from 'react-router-dom'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'
import theme from '../../app/theme'
import Notice from './Notice'

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

storiesOf('organisms/Notice', module)
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
  .add('Approval', () => (
    <Notice type='Approval' contributor='Jalil' id='123' message='message' dismiss={action('dismiss')} dismissed={false} />
  ))
  .add('Disapproval', () => (
    <Notice type='Disapproval' contributor='Jalil' id='123' message='message' dismiss={action('dismiss')} dismissed={false} />
  ))
  .add('Tip', () => (
    <Notice type='Tip' contributor='Jalil' id='123' message='message' dismiss={action('dismiss')} dismissed={false} />
  ))
  .add('Other', () => (
    <Notice type='Other' contributor='Jalil' id='123' message='message' dismiss={action('dismiss')} dismissed={false} />
  ))
  .add('dismissed', () => (
    <Notice type='Disapproval' contributor='Jalil' id='123' message='message' dismiss={action('dismiss')} dismissed={true} />
  ))
