import React from 'react';
import Loading from '../icons/Loading';
import LoadingRotator from './LoadingRotator';

export default {
  title: 'Components/Atoms/LoadingRotator'
};

export const Normal = () => (
  <LoadingRotator>
    <Loading />
  </LoadingRotator>
);

Normal.story = {
  name: 'normal'
};
