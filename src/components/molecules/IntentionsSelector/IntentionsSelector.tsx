import React from 'react';
import { Intention, intentions } from 'app/lmem/intention';
import IntentionIcon from 'components/atoms/Intentions/IntentionIcon';
import Container from './Container';

interface Props {
  value: Intention;
  onChange?: (intention: Intention) => void;
}

const IntentionSelector = ({ value, onChange }: Props) => {
  const handleChange = (intention: Intention) => {
    if (onChange) {
      return () => onChange(intention);
    }
  };

  return (
    <Container>
      {intentions.map(intention => (
        <IntentionIcon
          key={intention}
          intention={intention}
          active={intention === value}
          onClick={handleChange(intention)}
        />
      ))}
    </Container>
  );
};

export default IntentionSelector;
