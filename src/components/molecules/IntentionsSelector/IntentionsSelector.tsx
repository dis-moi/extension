import React, { Fragment } from 'react';
import { intentions } from 'app/lmem/intention';
import IntentionIcon from 'components/molecules/Type/IntentionIcon';
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
        clicked={intention === value}
      />
    ))}
  </IntentionsSelectorContainer>
);

export default IntentionSelector;
