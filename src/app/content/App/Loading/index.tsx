import React from 'react';
import Container from './Container';
import LoadingBig from 'components/atoms/icons/LoadingBig';

export const Loading = () => (
  <Container>
    <LoadingBig />
    Chargement…
  </Container>
);

export default Loading;
