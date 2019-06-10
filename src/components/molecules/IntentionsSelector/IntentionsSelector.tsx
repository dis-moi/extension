import React, { Fragment } from 'react';
import { intentions } from 'app/lmem/intention';
import IntentionIcon from 'components/atoms/Intentions/IntentionIcon';
import IntentionsSelectorContainer from './IntentionsSelectorContainer';

interface Props {
  value: string;
}

const IntentionSelector = ({ value }: Props) => (
  <IntentionsSelectorContainer>
    {intentions.map(intention => (
      <IntentionIcon
        key={intention}
        intention={intention}
        active={intention === value}
      />
    ))}
  </IntentionsSelectorContainer>
);

export default IntentionSelector;
