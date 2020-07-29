import { Provider } from 'react-redux';
import { DecoratorFunction } from '@storybook/addons';
import { StoryFnReactReturnType } from '@storybook/react/dist/client/preview/types';
import React from 'react';
import formStore from './formStore';

export const formStoreDecorator: DecoratorFunction<StoryFnReactReturnType> = getStory => (
  <Provider store={formStore}>
    <>{getStory()}</>
  </Provider>
);
