import React from 'react';
import styled from 'styled-components';
import ContentPage from '../../organisms/ContentPage/ContentPage';

export interface ContactPageProps {
  className?: string;
}

const ContactPage = styled(({ className }: ContactPageProps) => (
  <article className={className}>
    <ContentPage
      title="Nous contacter"
      markdownFilePath={require(`${__dirname}/ContactPageFr.md`)}
    />
  </article>
))``;

export default ContactPage;
