import React from 'react';
import styled from 'styled-components';
import Section from '../../atoms/Section/Section';
import GridContainer from '../../atoms/Grid/GridContainer';
import GridRow from '../../atoms/Grid/GridRow';
import GridCol from '../../atoms/Grid/GridCol';
import PrimaryHeadline from '../../atoms/Titles/PrimaryHeadline';
import Content from '../../atoms/Content/Content';

export interface ContentPageProps {
  className?: string;
  title: string;
  content: React.ReactElement;
}

const ContentPage = styled(
  ({ className, title, content }: ContentPageProps) => {
    return (
      <Section className={className}>
        <GridContainer>
          <GridRow>
            <GridCol>
              <PrimaryHeadline>{title}</PrimaryHeadline>
              <Content>{content}</Content>
            </GridCol>
          </GridRow>
        </GridContainer>
      </Section>
    );
  }
)`
  background: linear-gradient(0deg, #ffffff 0%, #f8f8f8 100%);
  padding: 100px 0;
  min-height: calc(100vw - 50px);

  ${GridContainer} {
    @media (min-width: ${props =>
        parseInt(props.theme.desktopWidth) + 200 + 'px'}) {
      width: 1062px;
    }
  }

  ${PrimaryHeadline} {
    color: ${props => props.theme.websiteLMEL.primaryColor};
  }
`;

export default ContentPage;
