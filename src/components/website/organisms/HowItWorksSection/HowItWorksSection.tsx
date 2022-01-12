import React from 'react';
import styled from 'styled-components';
import Screenshot from '../../../../assets/img/website/screenshots/dismoi-screenshot-amazon-antidote-desktop.jpg';
import GridContainer from '../../atoms/Grid/GridContainer';
import GridRow from '../../atoms/Grid/GridRow';
import GridCol from '../../atoms/Grid/GridCol';
import Section from '../../atoms/Section/Section';
import SectionTitle from '../../atoms/Titles/SectionTitle';
import Steps, { steps } from '../../molecules/Steps/Steps';
import VideoImage from '../../molecules/VideoImage/VideoImage';
import VideoModal from '../../molecules/VideoModal/VideoModal';
import { useTranslation } from 'react-i18next';
import { getFacet } from '../../../../libs/facets/getFacet';

const StyledGridRow = styled(props => <GridRow {...props} />)`
  justify-content: center;
`;

const StyledGridCol = styled(props => <GridCol {...props} />)`
  width: 100%;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
  @media (min-width: ${props => props.theme.tabletWidth}) {
    flex-direction: column;
  }
`;

const StyledVideoImage = styled(props => <VideoImage {...props} />)`
  margin: 10px auto 30px auto;
  @media (min-width: ${props => props.theme.tabletWidth}) {
    margin: 30px auto 0 auto;
  }
`;

export interface HowItWorksSectionProps {
  className?: string;
}

const HowItWorksSection = styled((props: HowItWorksSectionProps) => {
  const { t } = useTranslation('website');
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const facet = getFacet();
  const dismoi = facet === 'dismoi';
  return (
    <>
      <Section {...props}>
        <GridContainer>
          <StyledGridRow>
            <StyledGridCol>
              <SectionTitle>{t('home.howItWorks.sectionTitle')}</SectionTitle>
              <ContentWrapper>
                <Steps steps={steps} />
                {dismoi && (
                  <StyledVideoImage
                    image={Screenshot}
                    text={t('home.howItWorks.discoverIn1Min')}
                    handleClick={() => setModalOpen(true)}
                  />
                )}
              </ContentWrapper>
            </StyledGridCol>
          </StyledGridRow>
        </GridContainer>
      </Section>
      <VideoModal
        src="https://www.youtube.com/embed/y5_qCUhID4Y"
        title={t('home.howItWorks.modalTitle')}
        smallTitle={t('home.howItWorks.modalSmallTitle')}
        open={modalOpen}
        setOpen={setModalOpen}
      />
    </>
  );
})`
  background: white;
`;

export default HowItWorksSection;
