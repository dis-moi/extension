import React from 'react';
import styled, { DefaultTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';
import Section from '../../atoms/Section/Section';
import GridContainer from '../../atoms/Grid/GridContainer';
import GridRow from '../../atoms/Grid/GridRow';
import GridCol from '../../atoms/Grid/GridCol';
import PrimaryHeadline from '../../atoms/Titles/PrimaryHeadline';
import SecondaryHeadline from '../../atoms/Titles/SecondaryHeadline';
import BrowserAnimation from '../../atoms/BrowserAnimation/BrowserAnimation';
import CTAButton from '../../atoms/CTAButton/CTAButton';
import SectionArrow from '../../atoms/SectionArrow/SectionArrow';
import StoreRating from '../../atoms/StoreRating/StoreRating';
import DarkLayoutBackground from './backgrounds/DarkLayoutBackground';
import GradientBackground from './backgrounds/GradientBackground';
import GeometricShapeBackground from './backgrounds/GeometricShapeBackground';
import PatternBackground from './backgrounds/PatternBackground';

const StyledGridRow = styled(GridRow)`
  position: relative;
  padding-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (min-width: ${(props) => props.theme.tabletWidth}) {
    height: 55vh;
    min-height: 350px;
    padding-top: 52px;
    padding-bottom: 0;
    justify-content: flex-start;
  }
  @media (min-width: ${(props) => props.theme.desktopWidth}) {
    padding-top: 54px;
    min-height: 450px;
  }
`;

const widerThanDesktop =
  (extraPixels: number) => (props: { theme: DefaultTheme }) =>
    `${parseInt(props.theme.desktopWidth) + extraPixels}px`;

// L'animation n'a pas la place d'exister à côté du texte sur mobile : sa
// colonne n'y est pas affichée, et ses scripts n'y sont donc pas chargés.
const AnimationGridCol = styled(GridCol)`
  display: none;
  @media (min-width: ${(props) => props.theme.tabletWidth}) {
    display: flex;
    justify-content: center;
    width: 100%;
    max-width: 50%;
    padding-right: 25px;
  }
  @media (min-width: ${(props) => props.theme.desktopWidth}) {
    max-width: 45%;
  }
  @media (min-width: ${widerThanDesktop(100)}) {
    max-width: 40%;
    padding-right: 30px;
  }
  @media (min-width: ${widerThanDesktop(200)}) {
    padding-right: 35px;
  }
`;

const StyledBrowserAnimation = styled(BrowserAnimation)`
  width: 100%;
`;

const StyledGridCol = styled(GridCol)`
  text-align: center;
  @media (min-width: ${(props) => props.theme.tabletWidth}) {
    text-align: left;
  }
`;

const CTAAndRatingWrapper = styled.div`
  display: block;
  @media (min-width: ${(props) => props.theme.desktopWidth}) {
    display: flex;
    align-items: center;
  }
`;

const StyledCTAButton = styled(CTAButton)`
  margin-left: auto;
  margin-right: auto;
  @media (min-width: ${(props) => props.theme.tabletWidth}) {
    margin-left: 0;
    margin-right: 0;
  }
`;

const StyledStoreRating = styled(StoreRating)`
  margin-top: 10px;
  margin-bottom: 70px;
  @media (min-width: ${(props) => props.theme.tabletWidth}) {
    margin-top: 15px;
    margin-bottom: 0;
  }
  @media (min-width: ${(props) => props.theme.desktopWidth}) {
    margin-top: 0;
    margin-left: 20px;
  }
`;

const scrollToContent = () => {
  const firstSection = document.querySelector('section:first-child');
  const header = document.querySelector('header');

  if (firstSection && header) {
    window.scrollTo({
      top:
        firstSection.getBoundingClientRect().height -
        header.getBoundingClientRect().height +
        2,
      behavior: 'smooth',
    });
  }
};

interface ScrollToContentArrowProps {
  className?: string;
}

const ScrollToContentArrow = ({ className }: ScrollToContentArrowProps) => (
  <SectionArrow className={className} handleClick={scrollToContent} />
);

const StyledSectionArrow = styled(ScrollToContentArrow)`
  display: none;
  @media (min-width: ${(props) => props.theme.desktopWidth}) {
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

const COVER_ANIMATION_WORD_KEYS = [
  'word1',
  'word2',
  'word3',
  'word4',
  'word5',
  'word6',
  'word7',
  'word8',
  'word9',
] as const;

export interface CoverSectionProps {
  className?: string;
}

const CoverSection = styled((props: CoverSectionProps) => {
  const { t, i18n } = useTranslation('website');
  const animationWords = COVER_ANIMATION_WORD_KEYS.map((key) =>
    t(`home.coverAnimation.${key}`),
  );

  return (
    <Section id="cover" {...props}>
      <GradientBackground />
      <DarkLayoutBackground />
      <GeometricShapeBackground />
      <PatternBackground />
      <GridContainer>
        <StyledGridRow>
          <AnimationGridCol>
            <StyledBrowserAnimation
              words={animationWords}
              language={i18n.language}
            />
          </AnimationGridCol>
          <StyledGridCol>
            <PrimaryHeadline>{t('home.primaryHeadline')}</PrimaryHeadline>
            <SecondaryHeadline>{t('home.secondaryHeadline')}</SecondaryHeadline>
            <CTAAndRatingWrapper>
              <StyledCTAButton />
              <StyledStoreRating />
            </CTAAndRatingWrapper>
          </StyledGridCol>
        </StyledGridRow>
        <StyledSectionArrow />
      </GridContainer>
    </Section>
  );
})``;

export default CoverSection;
