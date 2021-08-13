import React from 'react';
import styled from 'styled-components';
import ContentPage from '../../organisms/ContentPage/ContentPage';

export interface AboutUsPageEnProps {
  className?: string;
}

const AboutUsPageEn = styled(({ className }: AboutUsPageEnProps) => (
  <article className={className}>
    <ContentPage
      title="About us"
      markdownFilePath={require(`${__dirname}/AboutUsPageEn.md`)}
    />
  </article>
))``;

export default AboutUsPageEn;
