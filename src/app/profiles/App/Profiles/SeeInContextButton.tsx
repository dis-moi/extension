import React from 'react';
import { BorderButton } from 'components/atoms';
import { Notice } from '../../../lmem/notice';

interface SeeInContextButtonProps {
  connected: boolean;
  notice: Notice;
  subscribed: boolean;
  clickHandler: () => void;
}

const SeeInContextButton = ({
  connected,
  notice,
  subscribed,
  clickHandler
}: SeeInContextButtonProps) => {
  if (connected && subscribed) {
    return (
      <>
        <BorderButton href={notice.url} onClick={clickHandler}>
          Voir en context
        </BorderButton>
      </>
    );
  }
};

export default SeeInContextButton;
