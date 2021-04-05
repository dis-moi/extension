import { Provider } from 'react-redux';
import { DecoratorFunction } from '@storybook/addons';
import React, { ReactElement } from 'react';
import formStore from './formStore';

export const formStoreDecorator: DecoratorFunction<ReactElement> = getStory => (
  <Provider store={formStore}>
    <>{getStory()}</>
  </Provider>
);
