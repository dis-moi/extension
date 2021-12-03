import React from 'react';
import styled, { css } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { getFacet } from 'libs/facets/getFacet';
import { useFacetName } from 'libs/facets/useFacetName.hook';
import { Facet } from 'libs/facets/facet';
import LogoLMEL from '../../atoms/LogoLMEL/LogoLMEL';
import LogoDisMoi from '../../atoms/LogoDisMoi/LogoDisMoi';
import SocialLink from '../../atoms/SocialButton/SocialLink';
import Section from '../../atoms/Section/Section';
import GridContainer from '../../atoms/Grid/GridContainer';
import GridRow from '../../atoms/Grid/GridRow';
import GridCol from '../../atoms/Grid/GridCol';
import ListLinks, { Link } from '../../molecules/Header/ListLinks';
import NavDesktopItem from '../../atoms/NavDesktopItem/NavDesktopItem';

const FooterWrapper = styled.footer`
  font-family: ${props => props.theme.website.fontFamily};
  font-size: ${props => props.theme.website.textSizeDesktop};
  background-color: #1d1d1d;
  &,
  a {
    color: #fff;
  }
  a {
    text-decoration: none;
  }
  .logoDisMoi {
    height: 35px;
    @media (min-width: ${props => props.theme.desktopWidth}) {
      height: 40px;
    }
    path {
      fill: white;
    }
  }
  .logoLMEL {
    height: 20px;
    @media (min-width: ${props => props.theme.desktopWidth}) {
      height: 25px;
    }
    path {
      fill: white;
    }
  }
`;

const StyledGridRow = styled(props => <GridRow {...props} />)`
  flex-direction: column;
  align-items: center;
  @media (min-width: ${props => props.theme.desktopWidth}) {
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
  }
`;
const GridCol1 = styled(props => <GridCol {...props} />)`
  text-align: center;
  @media (min-width: ${props => props.theme.desktopWidth}) {
    text-align: left;
  }
`;
const GridCol2 = styled(props => <GridCol {...props} />)`
  text-align: center;
  margin-top: 30px;
  @media (min-width: ${props => props.theme.desktopWidth}) {
    text-align: left;
    margin-top: 0;
  }
`;
const GridCol3 = styled(props => <GridCol {...props} />)`
  text-align: center;
  margin-top: 30px;
  a:first-child {
    display: block;
    transform: scale(0.8);
    transform-origin: center;
  }
  @media (min-width: ${props => props.theme.desktopWidth}) {
    margin-top: 0;
    a:first-child {
      text-align: right;
      transform-origin: right;
    }
  }
`;

const NavFooter = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  a:not(:first-child) {
    margin-top: 1rem;
  }
  @media (min-width: ${props => props.theme.desktopWidth}) {
    flex-direction: row;
    align-items: flex-start;
    a:not(:first-child) {
      margin-top: 0;
      margin-left: 1rem;
    }
  }
`;

const Legals = styled.p<{ facet: Facet }>`
  ${props =>
    props.facet === 'lmel'
      ? css`
          margin-top: 0;
        `
      : undefined}
  font-size: 12px;
  text-align: center;
  @media (min-width: ${props => props.theme.desktopWidth}) {
    text-align: right;
  }
`;

const SocialLinkWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 12px;
  @media (min-width: ${props => props.theme.desktopWidth}) {
    justify-content: flex-end;
  }
`;

export interface FooterProps {
  className?: string;
  links: Link[];
  switchLanguage: () => void;
}

const Footer = (props: FooterProps) => {
  const { t } = useTranslation('website');
  const facet = getFacet();
  const dismoi = facet === 'dismoi';
  const facetName = useFacetName();

  return (
    <FooterWrapper {...props}>
      <Section>
        <GridContainer>
          <StyledGridRow>
            <GridCol1>
              {facet === 'lmel' ? <LogoLMEL /> : <LogoDisMoi />}
              {dismoi && (
                <SocialLinkWrapper>
                  <SocialLink
                    icon="mastodon"
                    title={t('footer.followUsOn', { network: 'Mastodon' })}
                    href="#"
                  />
                  <SocialLink
                    icon="github"
                    title={t('footer.followUsOn', { network: 'GitHub' })}
                    href="https://github.com/dis-moi"
                  />
                  <SocialLink
                    icon="linkedin"
                    title={t('footer.followUsOn', { network: 'LinkedIn' })}
                    href="https://www.linkedin.com/company/dismoi/mycompany/"
                  />
                  <SocialLink
                    icon="facebook"
                    title={t('footer.followUsOn', { network: 'Facebook' })}
                    href="https://www.facebook.com/DisMoiCompagnon"
                  />
                  <SocialLink
                    icon="twitter"
                    title={t('footer.followUsOn', { network: 'Twitter' })}
                    href="https://twitter.com/dismoicompagnon"
                  />
                </SocialLinkWrapper>
              )}
            </GridCol1>
            <GridCol2>
              <NavFooter>
                <ListLinks links={props.links} />
              </NavFooter>
            </GridCol2>
            <GridCol3>
              {dismoi && (
                <NavDesktopItem onClick={props.switchLanguage}>
                  <span title="French">fr</span> |{' '}
                  <span title="English">en</span>
                </NavDesktopItem>
              )}
              <Legals facet={facet}>
                {t('footer.rightsReserved')} <br />
                {facetName} © 2021
              </Legals>
            </GridCol3>
          </StyledGridRow>
        </GridContainer>
      </Section>
    </FooterWrapper>
  );
};

export default Footer;
