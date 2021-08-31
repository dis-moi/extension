import React from 'react';
import styled from 'styled-components';
import SectionTitle from '../../atoms/Titles/SectionTitle';
import Section from '../../atoms/Section/Section';
import GridContainer from '../../atoms/Grid/GridContainer';
import GridRow from '../../atoms/Grid/GridRow';
import GridCol from '../../atoms/Grid/GridCol';
import Button from '../../atoms/Button/Button';

export interface BecomeAContributorSectionProps {
  className?: string;
}

const BecomeAContributorSection = styled(
  ({ className }: BecomeAContributorSectionProps) => {
    return (
      <Section className={className}>
        <GridContainer>
          <SectionTitle>
            Vous aussi, partagez vos conseils et expériences !
          </SectionTitle>
          <GridRow>
            <GridCol>
              <ul>
                <li>Donner votre avis</li>
                <li>Recommander une alternative</li>
                <li>Dénoncer une arnaque</li>
              </ul>
            </GridCol>
            <GridCol>
              <img
                src="img/website/dismoi-poster-une-information.jpg"
                alt="Poster une information"
              />
            </GridCol>
            <GridCol>
              <ul>
                <li>Corriger une information</li>
                <li>Signaler un thread sur Twitter</li>
                <li>Partager un bon plan</li>
              </ul>
            </GridCol>
          </GridRow>
          <GridRow>
            <Button
              text="Installer l’extension pour devenir contributeur"
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
