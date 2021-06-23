import React from 'react';
import styled from 'styled-components';
import CoverSection from '../../organisms/CoverSection/CoverSection';
import ExamplesSection from '../../organisms/ExamplesSection/ExamplesSection';
import HowItWorksSection from '../../organisms/HowItWorksSection/HowItWorksSection';
import ContributorsSection, {
  contributorsIds
} from '../../organisms/ContributorsSection/ContributorsSection';

export interface HomePageProps {
  className?: string;
}

const HomePage = styled(({ className }: HomePageProps) => (
  <article className={className}>
    <CoverSection />
    <ExamplesSection />
    <HowItWorksSection />
    <ContributorsSection contributorsIds={contributorsIds} />
  </article>
))``;

export default HomePage;
