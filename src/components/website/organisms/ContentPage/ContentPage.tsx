import React from 'react';
import MarkdownView from 'react-showdown';
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
  markdownFilePath: string;
}

const ContentPage = styled(
  ({ className, title, markdownFilePath }: ContentPageProps) => {
    const [content, setContent] = React.useState<string>('Chargement...');
    fetch(markdownFilePath)
      .then(response => {
        return response.text();
      })
      .then(text => {
        setContent(text);
      });
    return (
      <Section className={className}>
        <GridContainer>
          <GridRow>
            <GridCol>
              <PrimaryHeadline>{title}</PrimaryHeadline>
              <Content>
                <MarkdownView
                  markdown={content}
                  options={{
                    tables: true,
                    emoji: true,
                    ghCompatibleHeaderId: true,
                    disableForced4SpacesIndentedSublists: true,
                    simpleLineBreaks: true,
                    encodeEmails: true
                  }}
                />
              </Content>
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
    color: ${props => props.theme.website.primaryColor};
  }
`;

export default ContentPage;
