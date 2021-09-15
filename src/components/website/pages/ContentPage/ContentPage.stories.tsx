import React, { ReactElement, useEffect, useState } from 'react';
import MarkdownView from 'react-showdown';
import { StoryFn } from '@storybook/addons';
import ContentPage, {
  ContentPageProps
} from '../../organisms/ContentPage/ContentPage';
import Layout from '../../../../app/website/src/components/Layout';

export default {
  title: 'Website/Pages/ContentPage',
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
        <Layout
          pageContext={{ langKey: 'fr', slug: '/fr/slug', title: 'Home' }}
          path={'/'}
        >
          <>{getStory()}</>
        </Layout>
      </div>
    )
  ]
};

export const _ContentPage = (args: ContentPageProps) => {
  const [state, setState] = useState<string>('');
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    fetch(require(`${__dirname}/example.md`))
      .then(res => res.text())
      .then(text => setState(text));
  }, []);

  return (
    <ContentPage
      {...args}
      content={
        <MarkdownView
          /* eslint-disable-next-line @typescript-eslint/ban-ts-ignore */
          // @ts-ignore
          markdown={state}
          options={{
            tables: true,
            emoji: true,
            ghCompatibleHeaderId: true,
            disableForced4SpacesIndentedSublists: true,
            simpleLineBreaks: true,
            encodeEmails: true
          }}
        />
      }
    />
  );
};
_ContentPage.args = {
  title: 'Exemple de titre'
};
