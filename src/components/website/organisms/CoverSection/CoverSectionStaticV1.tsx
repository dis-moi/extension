import React from 'react';
import styled from 'styled-components';
import Section from '../../atoms/Section/Section';
import GridContainer from '../../atoms/Grid/GridContainer';
import GridRow from '../../atoms/Grid/GridRow';
import GridCol from '../../atoms/Grid/GridCol';
import PrimaryHeadline from '../../atoms/Titles/PrimaryHeadline';
import SecondaryHeadline from '../../atoms/Titles/SecondaryHeadline';
import BrowserAnimationVar1 from '../../atoms/BrowserAnimation/BrowserAnimationVar1';
import CTAButton from '../../atoms/CTAButton/CTAButton';
import SectionArrow from '../../atoms/SectionArrow/SectionArrow';
import StoreRating from '../../atoms/StoreRating/StoreRating';
import DarkLayoutBackground from './backgrounds/DarkLayoutBackground';
import GradientBackground from './backgrounds/GradientBackground';
import GeometricShapeBackground from './backgrounds/GeometricShapeBackground';
import PatternBackground from './backgrounds/PatternBackground';

const StyledGridRow = styled(props => <GridRow {...props} />)`
  position: relative;
  padding-top: 50px;
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-end;
  align-items: center;
  @media (min-width: ${props => props.theme.tabletWidth}) {
    height: 55vh;
    min-height: 350px;
    padding-top: 52px;
    padding-bottom: 0;
    flex-direction: row;
    justify-content: flex-start;
  }
  @media (min-width: ${props => props.theme.desktopWidth}) {
    padding-top: 54px;
    min-height: 450px;
  }
`;

const StyledGridCol1 = styled(props => <GridCol {...props} />)`
  display: flex;
  justify-content: center;
  padding-top: 30px;
  margin-bottom: -100px;
  @media (min-width: ${props => props.theme.tabletWidth}) {
    margin-bottom: 0;
    padding-top: 0;
  }
  width: 100%;
  max-width: 380px;
  @media (min-width: ${props => props.theme.tabletWidth}) {
    max-width: 50%;
    padding-right: 25px;
  }
  @media (min-width: ${props => props.theme.desktopWidth}) {
    max-width: 45%;
    padding-right: 25px;
  }
  @media (min-width: ${props =>
      parseInt(props.theme.desktopWidth) + 100 + 'px'}) {
    max-width: 40%;
    padding-right: 30px;
  }
  @media (min-width: ${props =>
      parseInt(props.theme.desktopWidth) + 200 + 'px'}) {
    padding-right: 35px;
  }
`;

const StyledGridCol2 = styled(props => <GridCol {...props} />)`
  text-align: center;
  @media (min-width: ${props => props.theme.tabletWidth}) {
    text-align: left;
  }
`;

const PrimaryHeadlineAnimate = styled(PrimaryHeadline)`
  line-height: 1.1365;

  & > span {
    position: relative;
    display: inline-block;
    height: 50px;
    overflow: hidden;
    vertical-align: bottom;

    & > #rotatingWords {
      display: block;
      text-align: left;

      &.started {
        animation: quote 18s ease-in-out infinite;
      }
    }
  }

  @keyframes quote {
    0% {
      transform: translateY(0);
    }
    8%,
    12% {
      transform: translateY(0);
    }
    18%,
    22% {
      transform: translateY(-50px);
    }
    28%,
    32% {
      transform: translateY(-100px);
    }
    38%,
    42% {
      transform: translateY(-150px);
    }
    48%,
    50% {
      transform: translateY(-200px);
    }
    58%,
    62% {
      transform: translateY(-250px);
    }
    68%,
    72% {
      transform: translateY(-300px);
    }
    78%,
    82% {
      transform: translateY(-350px);
    }
    88%,
    92% {
      transform: translateY(-400px);
    }
    to {
      transform: translateY(0);
    }
  }
`;

const CTAAndRatingWrapper = styled.div`
  display: block;
  @media (min-width: ${props => props.theme.desktopWidth}) {
    display: flex;
    align-items: center;
  }
`;

const StyledCTAButton = styled(props => <CTAButton {...props} />)`
  margin-left: auto;
  margin-right: auto;
  @media (min-width: ${props => props.theme.tabletWidth}) {
    margin-left: 0;
    margin-right: 0;
  }
`;

const StyledStoreRating = styled(props => <StoreRating {...props} />)`
  margin-top: 10px;
  @media (min-width: ${props => props.theme.tabletWidth}) {
    margin-top: 15px;
  }
  @media (min-width: ${props => props.theme.desktopWidth}) {
    margin-top: 0;
    margin-left: 20px;
  }
`;

const StyledSectionArrow = styled(props => (
  <SectionArrow
    handleClick={() => {
      const firstSection = document.querySelector('section:first-child');
      const header = document.querySelector('header');
      if (firstSection && header) {
        window.scrollTo({
          top:
            firstSection.getBoundingClientRect().height -
            header.getBoundingClientRect().height +
            2,
          behavior: 'smooth'
        });
      }
    }}
    {...props}
  />
))`
  display: none;
  @media (min-width: ${props => props.theme.desktopWidth}) {
    display: block;
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    path {
      fill: white;
    }
  }
`;

export interface CoverSectionStaticV1Props {
  className?: string;
}

const CoverSection = styled((props: CoverSectionStaticV1Props) => {
  return (
    <Section id="cover" {...props}>
      <GradientBackground />
      <DarkLayoutBackground />
      <GeometricShapeBackground />
      <PatternBackground />
      <GridContainer>
        <StyledGridRow>
          <StyledGridCol1>
            <BrowserAnimationVar1 />
          </StyledGridCol1>
          <StyledGridCol2>
            <PrimaryHeadlineAnimate>
              <span>
                <span id="rotatingWords">
                  Signalement de faux avis
                  <br />
                  Avis d&apos;experts de confiance
                  <br />
                  Alternatives moins chères
                  <br />
                  Qualité douteuse
                  <br />
                  Droits de réponse
                  <br />
                  Alternatives locales
                  <br />
                  Infox / Fakenews
                  <br />
                  Greenwashing
                  <br />
                  Vente direct producteurs
                </span>
              </span>
            </PrimaryHeadlineAnimate>
            <SecondaryHeadline>
              Soyez alerté par les experts de votre choix directement sur les
              pages web que vous visitez.
            </SecondaryHeadline>
            <CTAAndRatingWrapper>
              <StyledCTAButton />
              <StyledStoreRating />
            </CTAAndRatingWrapper>
          </StyledGridCol2>
        </StyledGridRow>
        <StyledSectionArrow />
      </GridContainer>
    </Section>
  );
})``;

export default CoverSection;
