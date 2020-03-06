import { Provider } from 'react-redux';
import { DecoratorFunction } from '@storybook/addons';
import { StoryFnReactReturnType } from '@storybook/react/dist/client/preview/types';
import React from 'react';
import optionsStore from '../src/app/options/store';
import formStore from './formStore';

export const formStoreDecorator: DecoratorFunction<StoryFnReactReturnType> = getStory => (
  <Provider store={formStore}>
    <>{getStory()}</>
  </Provider>
);

export const optionsStoreDecorator: DecoratorFunction = getStory => (
  <Provider store={optionsStore}>
    <>{getStory()}</>
  </Provider>
);
