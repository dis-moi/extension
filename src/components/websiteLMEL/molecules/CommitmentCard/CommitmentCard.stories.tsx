import React from 'react';
import CommitmentCard, {
  CommitmentCardProps,
  commitmentIcons
} from './CommitmentCard';
import { buttonIcons } from '../../atoms/Button/Button';

export default {
  title: 'Website/Atoms/CommitmentCard',
  argTypes: {
    icon: {
      options: commitmentIcons,
      control: { type: 'select' },
      default: null
    },
    title: {
      control: { type: 'text' }
    },
    text: {
      control: { type: 'text' }
    },
    buttonText: {
      control: { type: 'text' }
    },
    buttonIcon: {
      options: buttonIcons,
      control: { type: 'select' },
      default: null
    },
    href: {
      control: { type: 'text' }
    }
  }
};

export const _CommitmentCard = (args: CommitmentCardProps) => (
  <CommitmentCard {...args} />
);
_CommitmentCard.args = {
  icon: 'fast',
  title: 'Ne ralentit pas votre navigateur',
  text:
    'Contrairement à d’autres extensions, DisMoi ne ralentit pas votre navigateur. L’impact de l’extension sur la vitesse de votre navigation est minime et imperceptible.',
  buttonText: 'Lire les test de performances',
  buttonIcon: 'stat',
  href: '#'
};
