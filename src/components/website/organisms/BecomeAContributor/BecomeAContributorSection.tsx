import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { getFacet } from 'libs/facets/getFacet';
import SectionTitle from '../../atoms/Titles/SectionTitle';
import Section from '../../atoms/Section/Section';
import GridContainer from '../../atoms/Grid/GridContainer';
import GridRow from '../../atoms/Grid/GridRow';
import GridCol from '../../atoms/Grid/GridCol';
import Button from '../../atoms/Button/Button';
import PosterUneInformationDisMoi from '../../../../assets/img/website/dismoi-poster-une-information.jpg';
import PosterUneInformationLMEL from '../../../../assets/img/websiteLMEL/dismoi-poster-une-information.jpg';

export interface BecomeAContributorSectionProps {
  className?: string;
}

const BecomeAContributorSection = styled(
  ({ className }: BecomeAContributorSectionProps) => {
    const { t } = useTranslation('website');
    const facet = getFacet();
    const lmel = facet === 'lmel';
    return (
      <Section className={className}>
        <GridContainer>
          <SectionTitle>{t('home.becomeContributor.title')}</SectionTitle>
          <GridRow>
            <GridCol>
              <ul>
                <li>{t('home.becomeContributor.action1')}</li>
                <li>{t('home.becomeContributor.action2')}</li>
                <li>{t('home.becomeContributor.action3')}</li>
              </ul>
            </GridCol>
            <GridCol>
              <img
                src={(lmel
                  ? PosterUneInformationLMEL
                  : PosterUneInformationDisMoi
                ).substr(1)}
                alt={t('home.becomeContributor.imageAlt')}
              />
            </GridCol>
            <GridCol>
              <ul>
                <li>{t('home.becomeContributor.action4')}</li>
                <li>{t('home.becomeContributor.action5')}</li>
                <li>{t('home.becomeContributor.action6')}</li>
              </ul>
            </GridCol>
          </GridRow>
          <GridRow>
            <Button
              text={t('home.becomeContributor.buttonText')}
              icon="download"
              handleClick={() => false}
            />
          </GridRow>
        </GridContainer>
      </Section>
    );
  }
)`
  ${GridRow} {
    justify-content: center;
    flex-direction: column;
    @media (min-width: ${props => props.theme.tabletWidth}) {
      flex-direction: row;
    }
    ${GridCol} {
      width: 100%;
      text-align: center;
      img {
        width: calc(100% - 30px);
        max-width: 574px;
      }
      ul {
        ${lmel => (lmel ? 'display: none;' : '')}
        padding: 0;
        list-style: none;
        li {
          color: ${props => props.theme.website.primaryColor};
          font-family: ${props => props.theme.website.fontFamily};
          padding: 6px 0;
          font-weight: bold;
          font-size: 18px;
        }
      }

      @media (min-width: ${props => props.theme.tabletWidth}) {
        width: 33.33%;
        &:nth-child(1) {
          text-align: right;
        }
        &:nth-child(2) {
          text-align: center;
        }
        &:nth-child(3) {
          text-align: left;
        }
        img {
          width: 100%;
        }
        ul {
          li {
            padding: 22px 0;
          }
        }
      }
    }
    @media (max-width: ${props => props.theme.tabletWidth}) {
      padding-bottom: 20px;
      ${Button} {
        white-space: normal;
        height: auto;
        position: absolute;
        left: 15px;
        bottom: 15px;
        width: calc(100% - 30px);
        padding-top: 4px;
        padding-bottom: 6.5px;
      }
    }
    ${Button} {
      margin-top: 30px;
    }
  }
`;

export default BecomeAContributorSection;
