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
import CoverSectionAnimatedWithTextV2 from '../../organisms/CoverSection/CoverSectionAnimatedWithTextV2';

export interface HomePageAnimatedWithTextV2Props {
  className?: string;
}

const HomePage = styled(({ className }: HomePageAnimatedWithTextV2Props) => (
  <article className={className}>
    <CoverSectionAnimatedWithTextV2 />
    <ExamplesSection />
    <HowItWorksSection />
    <ContributorsSection contributorsIds={contributorsIds} />
    <OurCommitmentsSection commitmentCards={commitmentCards} />
  </article>
))``;

export default HomePage;
