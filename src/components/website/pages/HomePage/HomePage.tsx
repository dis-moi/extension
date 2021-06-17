import React from 'react';
import styled from 'styled-components';
import CoverSection from '../../organisms/CoverSection/CoverSection';
import ExemplesSection from '../../organisms/ExemplesSection/ExemplesSection';

export interface HomePageProps {
  className?: string;
}

const HomePage = styled(({ className }: HomePageProps) => (
  <article className={className}>
    <CoverSection />
    <ExemplesSection />
  </article>
))``;

export default HomePage;
