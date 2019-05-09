import { ComponentType } from 'react';
import { Intention } from 'app/lmem/intention';
// import Like from "./Like";
import Approval from './Like';
// import Dislike from "./Dislike";
import Disapproval from './Dislike';
import Tip from './Tip';
import Alternative from './Alternative';
import Other from './Other';

interface Props {
  active?: boolean;
}
const TypesIcons: { [key in Intention]: ComponentType<Props> } = {
  approval: Approval,
  disapproval: Disapproval,
  tip: Tip,
  alternative: Alternative,
  other: Other
};

export default TypesIcons;
