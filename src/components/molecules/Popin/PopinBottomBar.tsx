import React from 'react';
import { Trans } from 'react-i18next';
import styled from 'styled-components';
import { ExternalLink } from 'components/atoms';
import { WEBSITE_DOMAIN } from '../../../app/lmem';
import LogoBordeaux from 'assets/img/contributors/logo-bordeaux.png';
import LogoColibri from 'assets/img/contributors/logo-colibri-ecolo.png';
import LogoLeMonde from 'assets/img/contributors/logo-le-monde.png';
import LogoLesInrocks from 'assets/img/contributors/logo-les-inrocks.png';
import LogoMicode from 'assets/img/contributors/logo-micode.png';
import LogoQueChoisir from 'assets/img/contributors/logo-que-choisir.png';

const Link = styled(ExternalLink)`
  color: ${props => props.theme.colorText};
  font-weight: normal;
  text-decoration: underline;
`;

const PopinBottomBarContainer = styled.div`
  width: 100%;
  margin: 30px -60px -20px;
  padding: 36px 0;
  font-size: 16px;
  font-style: italic;
  text-align: center;
  background-color: ${props => props.theme.colorGrey100};
  border-radius: 0 0 ${props => props.theme.radiusM}
    ${props => props.theme.radiusM};
`;

const ContributorList = styled.ul`
  display: flex;
  justify-content: center;
  margin: 20px 0 0;
  padding-left: 0;
  list-style-type: none;
`;

const ContributorItem = styled.li`
  width: 60px;
  height: 60px;

  &:not(:first-child) {
    margin-left: 16px;
  }
`;

const PopinBottomBar = () => (
  <PopinBottomBarContainer>
    <Trans i18nKey={'profiles:action.know_more_dismoi'}>
      En savoir plus sur <Link href={`https://${WEBSITE_DOMAIN}/`}>DisMoi</Link>{' '}
      et ses sources
    </Trans>
    <ContributorList>
      <ContributorItem>
        <img src={LogoQueChoisir} alt="" />
      </ContributorItem>
      <ContributorItem>
        <img src={LogoColibri} alt="" />
      </ContributorItem>
      <ContributorItem>
        <img src={LogoLeMonde} alt="" />
      </ContributorItem>
      <ContributorItem>
        <img src={LogoBordeaux} alt="" />
      </ContributorItem>
      <ContributorItem>
        <img src={LogoLesInrocks} alt="" />
      </ContributorItem>
      <ContributorItem>
        <img src={LogoMicode} alt="" />
      </ContributorItem>
    </ContributorList>
  </PopinBottomBarContainer>
);

export default PopinBottomBar;
