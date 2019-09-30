import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import SuggestionsScreen from './SuggestionsScreen';
import { generateContributor } from 'test/fakers/generateContributor';
import Wrapper from '../../ScreenWrapper';

storiesOf('screens/SuggestionsScreen', module)
  .addDecorator(getStory => <Wrapper>{getStory()}</Wrapper>)
  .add('suggestions', () => (
    <SuggestionsScreen
      suggestions={[
        generateContributor(),
        { ...generateContributor(), subscribed: true },
        generateContributor()
      ]}
      subscribe={() => action('subscribe')}
      unsubscribe={() => action('unsubscribe')}
    />
  ));
