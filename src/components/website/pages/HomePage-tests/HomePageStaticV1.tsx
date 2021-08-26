import React from 'react';
import styled from 'styled-components';
import CoverSectionStaticV1 from '../../organisms/CoverSection/CoverSectionStaticV1';
import ExamplesSection from '../../organisms/ExamplesSection/ExamplesSection';
import HowItWorksSection from '../../organisms/HowItWorksSection/HowItWorksSection';
import ContributorsSection, {
  contributorsIds
} from '../../organisms/ContributorsSection/ContributorsSection';
import OurCommitmentsSection, {
  commitmentCards
} from '../../organisms/OurCommitmentsSection/OurCommitmentsSection';

export interface HomePageStaticV1Props {
  className?: string;
}

const HomePage = styled(({ className }: HomePageStaticV1Props) => (
  <article className={className}>
    <CoverSectionStaticV1 />
    <ExamplesSection />
    <HowItWorksSection />
    <ContributorsSection contributorsIds={contributorsIds} />
    <OurCommitmentsSection commitmentCards={commitmentCards} />
  </article>
))``;

export default HomePage;
