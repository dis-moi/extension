import React, { ReactElement } from 'react';
import { StoryFn } from '@storybook/addons';
import ContentPage, { ContentPageProps } from './ContentPage';

export default {
  title: 'Website/Organisms/ContentPage',
  argTypes: {
    title: {
      control: { type: 'text' }
    },
    content: {
      control: { type: 'text' }
    }
  },
  decorators: [
    (getStory: StoryFn<ReactElement>) => (
      <div style={{ margin: '-1rem' }}>
        <>{getStory()}</>
      </div>
    )
  ]
};

export const _ContentPage = (args: ContentPageProps) => (
  <ContentPage {...args} />
);
_ContentPage.args = {
  title: 'Exemple de titre',
  markdownFilePath: require(`${__dirname}/example.md`)
};
