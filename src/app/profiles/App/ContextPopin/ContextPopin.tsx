import React from 'react';
import Popin from 'components/molecules/Popin/Popin';
import PopinParagraph from 'components/molecules/Popin/PopinParagraph';
import { BackgroundButton } from 'components/atoms';
import { SetContextPopin } from '../../store/actions/contextPopin';
import {
  ContextPopinState,
  initialState
} from '../../store/reducers/contextPopin.reducer';

interface ContextPopinProps {
  setContextPopin: SetContextPopin;
  contextPopin: ContextPopinState;
}

const ContextPopin = ({ setContextPopin, contextPopin }: ContextPopinProps) => {
  const { content, opened } = contextPopin;
  if (!content) return null;
  return (
    <Popin setOpened={() => setContextPopin(initialState)} opened={opened}>
      <PopinParagraph align={'center'}>{content.text}</PopinParagraph>
      {content.btn && (
        <BackgroundButton
          className="bulle-installer"
          onClick={content.btn?.onClick}
        >
          {content.btn?.label}
        </BackgroundButton>
      )}
    </Popin>
  );
};
export default ContextPopin;
