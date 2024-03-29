import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import i18n from 'libs/i18n';
import { getFacet } from 'libs/facets/getFacet';
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
import GeometricShapeBackground2 from './backgrounds/GeometricShapeBackground2';
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
  ${props => (props.dismoi ? 'margin-bottom: -100px;' : '')};
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
  margin-bottom: 70px;
  @media (min-width: ${props => props.theme.tabletWidth}) {
    margin-top: 15px;
    margin-bottom: 0;
  }
  @media (min-width: ${props => props.theme.desktopWidth}) {
    margin-top: 0;
    margin-left: 20px;
  }
`;

const StyledBrowserAnimation = styled(props => <BrowserAnimation {...props} />)`
  display: none;
  @media (min-width: ${props => props.theme.tabletWidth}) {
    display: block;
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

export interface CoverSectionProps {
  className?: string;
}

const CoverSection = styled((props: CoverSectionProps) => {
  const { t } = useTranslation('website');
  const facet = getFacet();
  const lmel = facet === 'lmel';
  const dismoi = facet === 'dismoi';

  return (
    <Section id="cover" {...props}>
      <GradientBackground />
      {dismoi && <DarkLayoutBackground />}
      <GeometricShapeBackground />
      {lmel && <GeometricShapeBackground2 />}
      <PatternBackground />
      <GridContainer>
        <StyledGridRow>
          <StyledGridCol1 dismoi={dismoi}>
            <StyledBrowserAnimation />
            <span
              id="variableWords"
              data-word1={t('home.coverAnimation.word1')}
              data-word2={t('home.coverAnimation.word2')}
              data-word3={t('home.coverAnimation.word3')}
              data-word4={t('home.coverAnimation.word4')}
              data-word5={t('home.coverAnimation.word5')}
              data-word6={t('home.coverAnimation.word6')}
              data-word7={t('home.coverAnimation.word7')}
              data-word8={t('home.coverAnimation.word8')}
              data-word9={t('home.coverAnimation.word9')}
              data-language={i18n.language}
            />
          </StyledGridCol1>
          <StyledGridCol2>
            <PrimaryHeadline>{t('home.primaryHeadline')}</PrimaryHeadline>
            <SecondaryHeadline>{t('home.secondaryHeadline')}</SecondaryHeadline>
            <CTAAndRatingWrapper>
              <StyledCTAButton />
              {dismoi && <StyledStoreRating />}
            </CTAAndRatingWrapper>
          </StyledGridCol2>
        </StyledGridRow>
        <StyledSectionArrow />
      </GridContainer>
    </Section>
  );
})``;

export default CoverSection;
