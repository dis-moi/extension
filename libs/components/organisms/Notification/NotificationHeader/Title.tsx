import React from 'react';
import TitleContainer from './TitleContainer';
import { truncateButPreserveWords } from '../../../../utils/truncate';
import { stripHtml } from '../../../../utils/stripHtml';

interface TitleInterface {
  children: string;
}

export default ({ children }: TitleInterface) => (
  <TitleContainer>
    {truncateButPreserveWords(stripHtml(children), 34)}
  </TitleContainer>
);
