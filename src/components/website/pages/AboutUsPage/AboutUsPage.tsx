import React from 'react';
import styled from 'styled-components';
import ContentPage from '../../organisms/ContentPage/ContentPage';

export interface AboutUsPageProps {
  className?: string;
}

const AboutUsPage = styled(({ className }: AboutUsPageProps) => (
  <article className={className}>
    <ContentPage
      title="À propos"
      markdownFilePath={require(`${__dirname}/AboutUsPageFr.md`)}
    />
  </article>
))``;

export default AboutUsPage;
