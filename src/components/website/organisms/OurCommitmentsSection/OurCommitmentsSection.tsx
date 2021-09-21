import React from 'react';
import styled from 'styled-components';
import SectionTitle from '../../atoms/Titles/SectionTitle';
import Section from '../../atoms/Section/Section';
import GeometricShapeBackground from '../CoverSection/backgrounds/GeometricShapeBackground';
import PatternBackground from '../CoverSection/backgrounds/PatternBackground';
import CommitmentCard, {
  CommitmentCardProps
} from '../../molecules/CommitmentCard/CommitmentCard';
import GridContainer from '../../atoms/Grid/GridContainer';
import GridRow from '../../atoms/Grid/GridRow';
import GridCol from '../../atoms/Grid/GridCol';
import { useTranslation } from 'react-i18next';

const StyledSectionTitle = styled(props => <SectionTitle {...props} />)`
  color: white;
`;

export const commitmentCards: CommitmentCardProps[] = [
  {
    icon: 'lock',
    title: 'home.commitments.cards.card1.title',
    text: 'home.commitments.cards.card1.text',
    buttonText: 'home.commitments.cards.card1.buttonText',
    buttonIcon: 'checklist',
    href: '#'
  },
  {
    icon: 'noShit',
    title: 'home.commitments.cards.card2.title',
    text: 'home.commitments.cards.card2.text',
    buttonText: 'home.commitments.cards.card2.buttonText',
    buttonIcon: 'coins',
    href: '#'
  },
  {
    icon: 'fast',
    title: 'home.commitments.cards.card3.title',
    text: 'home.commitments.cards.card3.text',
    buttonText: 'home.commitments.cards.card3.buttonText',
    buttonIcon: 'stats',
    href: '#'
  },
  {
    icon: 'openSource',
    title: 'home.commitments.cards.card4.title',
    text: 'home.commitments.cards.card4.text',
    buttonText: 'home.commitments.cards.card4.buttonText',
    buttonIcon: 'github',
    href: '#'
  }
];

export interface OurCommitmentsSectionProps {
  className?: string;
  commitmentCards: CommitmentCardProps[];
}

const OurCommitmentsSection = styled(
  ({ className, commitmentCards }: OurCommitmentsSectionProps) => {
    const { t } = useTranslation('website');
    return (
      <Section className={className}>
        <GeometricShapeBackground />
        <PatternBackground />
        <GridContainer>
          <StyledSectionTitle>{t('home.commitments.title')}</StyledSectionTitle>
          <GridRow>
            {commitmentCards &&
              commitmentCards.map<React.ReactNode>((commitmentCard, index) => (
                <GridCol key={index}>
                  <CommitmentCard {...commitmentCard} />
                </GridCol>
              ))}
          </GridRow>
        </GridContainer>
      </Section>
    );
  }
)`
  background-color: ${props => props.theme.website.primaryColor};

  ${GeometricShapeBackground} {
    transform: scaleX(-1);
  }

  ${GridRow} {
    padding-top: 18px;
    display: block;
    margin-right: 0;
    margin-left: 0;
    @media (min-width: ${props => props.theme.desktopWidth}) {
      padding-top: 20px;
      display: flex;
      flex-wrap: wrap;
      align-items: initial;
      margin-right: -15px;
      margin-left: -15px;
    }

    ${GridCol} {
      padding-right: 0;
      padding-left: 0;
      @media (min-width: ${props => props.theme.desktopWidth}) {
        display: flex;
        width: 25%;
        padding-right: 15px;
        padding-left: 15px;
      }
    }
  }
`;

export default OurCommitmentsSection;
