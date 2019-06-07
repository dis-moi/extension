import { ComponentType } from 'react';
import { Intention } from 'app/lmem/intention';
import ThumbUp from './ThumbUp';
import ThumbDown from './ThumbDown';
import Information from './Information';
import Alternative from './Alternative';
import Other from './Other';

interface Props {
  filled?: boolean;
  stroked?: boolean;
}
const IntentionsIcons: { [key in Intention]: ComponentType<Props> } = {
  approval: ThumbUp,
  disapproval: ThumbDown,
  information: Information,
  alternative: Alternative,
  other: Other
};

export default IntentionsIcons;
