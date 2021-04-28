import React, { MouseEvent } from 'react';
import Popin from 'components/molecules/Popin/Popin';
import PopinParagraph from 'components/molecules/Popin/PopinParagraph';
import { BackgroundButton } from 'components/atoms';

export interface PopinDisplayState {
  content: {
    text: string;
    btnLabel?: string;
    onClick?: (params?: MouseEvent<HTMLButtonElement>) => void;
  };
  opened: boolean;
}
interface ContextPopinProps {
  setPopin: (popinDisplayState: PopinDisplayState) => void;
  popin: PopinDisplayState;
}

export const contextPopinInitState = {
  content: { text: '' },
  opened: false
};

const ContextPopin = ({ setPopin, popin }: ContextPopinProps) => {
  const { content, opened } = popin;

  if (!content) return null;
  return (
    <Popin setOpened={() => setPopin(contextPopinInitState)} opened={opened}>
      <PopinParagraph align={'center'}>{content.text}</PopinParagraph>
      {content.onClick && (
        <BackgroundButton className="bulle-installer" onClick={content.onClick}>
          {content.btnLabel}
        </BackgroundButton>
      )}
    </Popin>
  );
};
export default ContextPopin;
