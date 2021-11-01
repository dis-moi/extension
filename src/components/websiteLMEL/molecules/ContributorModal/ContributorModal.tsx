import React from 'react';
import styled from 'styled-components';
import { BaseContributor } from 'libs/domain/contributor';
import Modal from '../../atoms/Modal/Modal';
import SectionTitle from '../../atoms/Titles/SectionTitle';
import ContributorAvatar from '../../atoms/ContributorAvatar/ContributorAvatar';
import GridContainer from '../../atoms/Grid/GridContainer';
import GridRow from '../../atoms/Grid/GridRow';
import GridCol from '../../atoms/Grid/GridCol';

const StyledGridRow = styled(props => <GridRow {...props} />)`
  justify-content: center;
`;

const StyledGridCol = styled(props => <GridCol {...props} />)`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledSectionTitle = styled(props => <SectionTitle {...props} />)`
  color: white;
  padding: 0 15px;
  margin-bottom: 5px;
`;

const IntroWrapper = styled.div`
  color: white;
  text-align: center;
  * {
    color: white !important;
    text-align: center;
  }
`;

const ScreenshotWrapper = styled.div`
  position: relative;
  width: calc(100% - 30px);
  max-width: 1000px;
  @media (min-width: ${props => props.theme.tabletWidth}) {
    width: calc(100% - 100px);
  }
  &::before {
    display: block;
    content: '';
    padding-top: 56.25%;
  }
  background-color: white;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path fill="rgb(221,221,221)" opacity="0.5" d="M73 50c0-12.7-10.3-23-23-23S27 37.3 27 50m3.9 0c0-10.5 8.5-19.1 19.1-19.1S69.1 39.5 69.1 50"><animateTransform attributeName="transform" attributeType="XML" type="rotate" dur="1s" from="0 50 50" to="360 50 50" repeatCount="indefinite"/></path></svg>');
  background-size: 80px;
  background-repeat: no-repeat;
  background-position: center;
  img {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

export interface ContributorModalProps {
  className?: string;
  contributor: BaseContributor;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ContributorModal = styled(
  ({ className, contributor, open, setOpen }: ContributorModalProps) => {
    // eslint-disable-next-line camelcase
    const imageUrl = contributor.avatar?.extra_large?.url
      ? contributor.avatar.extra_large.url
      : contributor.avatar?.large?.url
      ? contributor.avatar.large.url
      : 'DEFAULT';
    const screenshot = contributor.contribution?.example?.screenshot;
    return (
      <Modal className={className} open={open} setOpen={setOpen}>
        <GridContainer>
          <StyledGridRow>
            <StyledGridCol>
              <ContributorAvatar imageUrl={imageUrl} name={contributor.name} />
              <StyledSectionTitle>{contributor.name}</StyledSectionTitle>
              <IntroWrapper
                dangerouslySetInnerHTML={{
                  __html: contributor.intro as string
                }}
              />
              {screenshot && (
                <ScreenshotWrapper>
                  <img
                    src={contributor.contribution?.example?.screenshot}
                    alt={contributor.name}
                  />
                </ScreenshotWrapper>
              )}
            </StyledGridCol>
          </StyledGridRow>
        </GridContainer>
      </Modal>
    );
  }
)`
  font-family: ${props => props.theme.websiteLMEL.fontFamily};
`;

export default ContributorModal;
