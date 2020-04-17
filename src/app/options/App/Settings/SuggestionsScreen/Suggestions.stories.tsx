import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import SuggestionsScreen from './SuggestionsScreen';
import { generateStatefulContributor } from 'test/fakers/generateContributor';
import Wrapper from '../../ScreenWrapper';

storiesOf('Settings/SuggestionsScreen', module)
  .addDecorator(getStory => <Wrapper>{getStory()}</Wrapper>)
  .add('suggestions', () => {
    const suggestions = [
      generateStatefulContributor({ subscribed: false }),
      generateStatefulContributor({ subscribed: true }),
      generateStatefulContributor({ subscribed: false })
    ];
    return (
      <SuggestionsScreen
        suggestions={suggestions}
        allContributors={suggestions}
        subscribe={() => action('subscribe')}
        unsubscribe={() => action('unsubscribe')}
      />
    );
  })
  .add('no suggestions', () => (
    <SuggestionsScreen
      allContributors={[]}
      suggestions={[]}
      subscribe={() => action('subscribe')}
      unsubscribe={() => action('unsubscribe')}
    />
  ));
