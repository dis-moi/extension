import React from 'react';
import styled from 'styled-components';
import ContentPage from '../../organisms/ContentPage/ContentPage';

export interface AboutUsPageFrProps {
  className?: string;
}

const AboutUsPageFr = styled(({ className }: AboutUsPageFrProps) => (
  <article className={className}>
    <ContentPage
      title="À propos"
      markdownFilePath={require(`${__dirname}/AboutUsPageFr.md`)}
    />
  </article>
))``;

export default AboutUsPageFr;
