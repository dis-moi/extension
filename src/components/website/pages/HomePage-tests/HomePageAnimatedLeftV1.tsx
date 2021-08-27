import React from 'react';
import styled from 'styled-components';
import ExamplesSection from '../../organisms/ExamplesSection/ExamplesSection';
import HowItWorksSection from '../../organisms/HowItWorksSection/HowItWorksSection';
import ContributorsSection, {
  contributorsIds
} from '../../organisms/ContributorsSection/ContributorsSection';
import OurCommitmentsSection, {
  commitmentCards
} from '../../organisms/OurCommitmentsSection/OurCommitmentsSection';
import CoverSectionAnimatedLeft from '../../organisms/CoverSection/CoverSectionAnimatedLeft';

export interface HomePageAnimatedLeftV1Props {
  className?: string;
}

const HomePage = styled(({ className }: HomePageAnimatedLeftV1Props) => (
  <article className={className}>
    <CoverSectionAnimatedLeft />
    <ExamplesSection />
    <HowItWorksSection />
    <ContributorsSection contributorsIds={contributorsIds} />
    <OurCommitmentsSection commitmentCards={commitmentCards} />
  </article>
))``;

export default HomePage;
