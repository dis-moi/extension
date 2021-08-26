import React from 'react';
import styled from 'styled-components';
import CoverSection from '../../organisms/CoverSection/CoverSection';
import ExamplesSection from '../../organisms/ExamplesSection/ExamplesSection';
import HowItWorksSection from '../../organisms/HowItWorksSection/HowItWorksSection';
import ContributorsSection, {
  contributorsIds
} from '../../organisms/ContributorsSection/ContributorsSection';
import OurCommitmentsSection, {
  commitmentCards
} from '../../organisms/OurCommitmentsSection/OurCommitmentsSection';

export interface HomePageOriginalProps {
  className?: string;
}

const HomePageOriginal = styled(({ className }: HomePageOriginalProps) => (
  <article className={className}>
    <CoverSection />
    <ExamplesSection />
    <HowItWorksSection />
    <ContributorsSection contributorsIds={contributorsIds} />
    <OurCommitmentsSection commitmentCards={commitmentCards} />
  </article>
))``;

export default HomePageOriginal;
