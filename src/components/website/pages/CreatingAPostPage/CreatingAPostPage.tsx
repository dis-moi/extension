import React from 'react';
import styled from 'styled-components';
import ContentPage from '../../organisms/ContentPage/ContentPage';

export interface CreatingAPostPageProps {
  className?: string;
}

const CreatingAPostPage = styled(({ className }: CreatingAPostPageProps) => (
  <article className={className}>
    <ContentPage
      title="Poster une information sur le web grâce à DisMoi"
      markdownFilePath={require(`${__dirname}/CreatingAPostPageFr.md`)}
    />
  </article>
))``;

export default CreatingAPostPage;
