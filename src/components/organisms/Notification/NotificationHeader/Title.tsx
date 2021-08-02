import React from 'react';
import { truncateButPreserveWords } from 'libs/utils/truncate';
import { stripHtml } from 'libs/utils/stripHtml';
import TitleContainer from './TitleContainer';

interface TitleInterface {
  children: string;
}

export default ({ children }: TitleInterface) => (
  <TitleContainer>
    {truncateButPreserveWords(stripHtml(children), 34)}
  </TitleContainer>
);
