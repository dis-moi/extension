import React from 'react';
import styled from 'styled-components';
import CoverSection from '../../organisms/CoverSection/CoverSection';
import ExamplesSection from '../../organisms/ExamplesSection/ExamplesSection';
import HowItWorksSection from '../../organisms/HowItWorksSection/HowItWorksSection';

export interface HomePageProps {
  className?: string;
}

const HomePage = styled(({ className }: HomePageProps) => (
  <article className={className}>
    <CoverSection />
    <ExamplesSection />
    <HowItWorksSection />
  </article>
))``;

export default HomePage;
