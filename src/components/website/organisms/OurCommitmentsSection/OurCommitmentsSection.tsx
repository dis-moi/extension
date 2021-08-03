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

const StyledSectionTitle = styled(props => <SectionTitle {...props} />)`
  color: white;
`;

export const commitmentCards: CommitmentCardProps[] = [
  {
    icon: 'lock',
    title: 'Respecte votre vie privée',
    text:
      '<b>L’extension ne fait pas de profilage et aucune donnée de nos utilisateurs n’est exploitée ni revendue.</b> L’utilisation de l’extension DisMoi est par défaut anonyme.',
    buttonText: 'Lire la charte de vie privée',
    buttonIcon: 'checklist',
    href: '#'
  },
  {
    icon: 'noShit',
    title: 'Sans Publicité',
    text:
      '<b>DisMoi ne vous diffusera jamais de publicité.</b> C’est vous qui choisissez de vous abonner à chaque contributeurs, ou inversement de ne plus le suivre si ses contributions vous gênent.',
    buttonText: 'Comment nous finançons nous ?',
    buttonIcon: 'coins',
    href: '#'
  },
  {
    icon: 'fast',
    title: 'Ne ralentit pas votre navigateur',
    text:
      '<b>Contrairement à d’autres extensions, DisMoi ne ralentit pas votre navigateur.</b> L’impact de l’extension sur la vitesse de votre navigation est minime et imperceptible.',
    buttonText: 'Lire les tests de performances',
    buttonIcon: 'stats',
    href: '#'
  },
  {
    icon: 'openSource',
    title: 'Transparent & Open Source',
    text:
      '<b>Le code source est consultable depuis notre dépôt GitHub en open source.</b> Chacun peut le réutiliser librement et y contribuer. Participez à la construction d’un internet libre, neutre et ouvert.',
    buttonText: 'Parcourir le code sur GitHub',
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
    return (
      <Section className={className}>
        <GeometricShapeBackground />
        <PatternBackground />
        <GridContainer>
          <StyledSectionTitle>Nos engagements</StyledSectionTitle>
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
