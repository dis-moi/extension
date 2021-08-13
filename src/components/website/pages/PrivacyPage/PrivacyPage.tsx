import React from 'react';
import styled from 'styled-components';
import ContentPage from '../../organisms/ContentPage/ContentPage';

export interface PrivacyPageProps {
  className?: string;
}

const PrivacyPage = styled(({ className }: PrivacyPageProps) => (
  <article className={className}>
    <ContentPage
      title="DisMoi et votre vie privée"
      markdownFilePath={require(`${__dirname}/PrivacyPageFr.md`)}
    />
  </article>
))``;

export default PrivacyPage;
