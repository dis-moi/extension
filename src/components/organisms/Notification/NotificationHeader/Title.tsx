import React from 'react';
import { truncateButPreserveWords } from '../../../../app/utils/truncate';
import { stripHtml } from '../../../../app/utils/stripHtml';
import TitleContainer from './TitleContainer';

interface TitleInterface {
  children: string;
}

export default ({ children }: TitleInterface) => (
  <TitleContainer>
    {truncateButPreserveWords(stripHtml(children), 34)}
  </TitleContainer>
);
