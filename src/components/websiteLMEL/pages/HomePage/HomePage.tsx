import React from 'react';
import styled from 'styled-components';
import CoverSection from '../../organisms/CoverSection/CoverSection';
import ExamplesSection from '../../organisms/ExamplesSection/ExamplesSection';
import HowItWorksSection from '../../organisms/HowItWorksSection/HowItWorksSection';
import ContributorsSection from '../../organisms/ContributorsSection/ContributorsSection';
import OurCommitmentsSection, {
  commitmentCards
} from '../../organisms/OurCommitmentsSection/OurCommitmentsSection';
import { BaseContributor } from '../../../../libs/domain/contributor';
import BecomeAContributorSection from '../../organisms/BecomeAContributor/BecomeAContributorSection';

export interface HomePageProps {
  className?: string;
  contributors: BaseContributor[];
}

const HomePage = styled(({ className, contributors }: HomePageProps) => {
  return (
    <article className={className}>
      <CoverSection />
      <ExamplesSection />
      <HowItWorksSection />
      <ContributorsSection contributors={contributors} />
      <BecomeAContributorSection />
      <OurCommitmentsSection commitmentCards={commitmentCards} />
    </article>
  );
})``;

export default HomePage;
