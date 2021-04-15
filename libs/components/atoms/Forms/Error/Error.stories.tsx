import React from 'react';
import Error from './Error';

export default {
  title: 'Components/Atoms/Forms/Error Text'
};

export const Text = () => (
  <Error>Les champs en rouge sont incorrects ou incomplets</Error>
);

Text.story = {
  name: 'text'
};
