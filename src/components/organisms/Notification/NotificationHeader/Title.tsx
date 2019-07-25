import React from 'react';
import TitleContainer from './TitleContainer';
import { truncateButPreserveWords } from '../../../../app/utils/truncate';
import { stripHtml } from '../../../../app/utils/stripHtml';

interface TitleInterface {
  children: string;
}

export default ({ children }: TitleInterface) => (
  <TitleContainer>
    {truncateButPreserveWords(stripHtml(children), 34)}
  </TitleContainer>
);
