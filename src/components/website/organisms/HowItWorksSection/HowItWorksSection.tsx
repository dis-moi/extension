import React from 'react';
import styled from 'styled-components';
import Screenshot from '../../../../assets/img/website/screenshots/dismoi-screenshot-amazon-antidote-mounted-website-desktop.jpg';
import GridContainer from '../../atoms/Grid/GridContainer';
import GridRow from '../../atoms/Grid/GridRow';
import GridCol from '../../atoms/Grid/GridCol';
import Section from '../../atoms/Section/Section';
import SectionTitle from '../../atoms/Titles/SectionTitle';
import Steps, { steps } from '../../molecules/Steps/Steps';
import VideoImage from '../../molecules/VideoImage/VideoImage';
import VideoModal from '../../molecules/VideoModal/VideoModal';

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
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  return (
    <>
      <Section {...props}>
        <GridContainer>
          <StyledGridRow>
            <StyledGridCol>
              <SectionTitle>Comment ça marche ?</SectionTitle>
              <ContentWrapper>
                <Steps steps={steps} />
                <StyledVideoImage
                  image={Screenshot}
                  text="Découvrir comment fonctionne DisMoi en 1 minute"
                  handleClick={() => setModalOpen(true)}
                />
              </ContentWrapper>
            </StyledGridCol>
          </StyledGridRow>
        </GridContainer>
      </Section>
      <VideoModal
        src="https://www.youtube.com/embed/y5_qCUhID4Y"
        title="Comment fonctionne l’extension DisMoi ?"
        open={modalOpen}
        setOpen={setModalOpen}
      />
    </>
  );
})`
  background: white;
`;

export default HowItWorksSection;
