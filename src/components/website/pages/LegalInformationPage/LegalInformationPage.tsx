import React from 'react';
import styled from 'styled-components';
import ContentPage from '../../organisms/ContentPage/ContentPage';

export interface LegalInformationPageProps {
  className?: string;
}

const LegalInformationPage = styled(
  ({ className }: LegalInformationPageProps) => (
    <article className={className}>
      <ContentPage
        title="Mentions légales"
        markdownFilePath={require(`${__dirname}/LegalInformationPageFr.md`)}
      />
    </article>
  )
)``;

export default LegalInformationPage;
