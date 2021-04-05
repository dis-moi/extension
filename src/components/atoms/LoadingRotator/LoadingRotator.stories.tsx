import React from 'react';
import LoadingRotator from './LoadingRotator';
import Loading from '../icons/Loading';

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
