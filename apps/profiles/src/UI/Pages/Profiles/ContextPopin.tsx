import Popin from '../../../../../../libs/components/molecules/Popin/Popin';
import React from 'react';
import PopinParagraph from '../../../../../../libs/components/molecules/Popin/PopinParagraph';
import { BackgroundButton } from '../../../../../../libs/components/atoms';

export interface PopinDisplayState {
  content?: {
    text?: string;
    btnLabel?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onClick?: (params: any) => void;
  };
  opened: boolean;
}
interface ContextPopinProps {
  setPopin: (popinDisplayState: PopinDisplayState) => void;
  popin: PopinDisplayState;
}

export const contextPopinInitState = {
  content: undefined,
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
