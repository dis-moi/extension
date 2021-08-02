import React from 'react';
import styled from 'styled-components';
import ContentPage from '../../organisms/ContentPage/ContentPage';

export interface TCUPageProps {
  className?: string;
}

const TCUPage = styled(({ className }: TCUPageProps) => (
  <article className={className}>
    <ContentPage
      title="Conditions générales d’utilisation de DisMoi : Extension navigateur, application mobile et site web"
      markdownFilePath={require(`${__dirname}/TCUPageFr.md`)}
    />
  </article>
))``;

export default TCUPage;
