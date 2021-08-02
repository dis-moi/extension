import React from 'react';
import styled from 'styled-components';
import ContentPage from '../../organisms/ContentPage/ContentPage';

export interface PressRoomPageProps {
  className?: string;
}

const PressRoomPage = styled(({ className }: PressRoomPageProps) => (
  <article className={className}>
    <ContentPage
      title="Espace Presse"
      markdownFilePath={require(`${__dirname}/PressRoomPageFr.md`)}
    />
  </article>
))``;

export default PressRoomPage;
