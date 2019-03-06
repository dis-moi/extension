import { ComponentType } from 'react';
import { NoticeType } from 'app/lmem/noticeType';
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
export const TypesIcons: { [key in NoticeType]: ComponentType<Props> } = {
  Approval,
  Disapproval,
  Tip,
  Alternative,
  Other
};

export default TypesIcons;
