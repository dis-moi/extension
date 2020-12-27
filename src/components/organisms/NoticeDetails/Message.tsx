import React, { MouseEventHandler } from 'react';
import styled from 'styled-components';
import getMessageWithMediaPlayer from '../../../app/utils/getMessageWithMediaPlayer';

const MessageBlock = styled.div`
  max-height: 216px;
  margin-top: 10px;
  overflow-y: auto;

  p {
    margin: 0 16px 0 0;
    font-size: 15px;
    line-height: 1.4;
    color: ${props => props.theme.primaryColor};
  }
`;

interface Props {
  children: string;
  onClick?: MouseEventHandler;
}
const Message = ({ children, onClick }: Props) => {
  const childrenWithMedia = getMessageWithMediaPlayer(children);

  return (
    <MessageBlock
      onClick={onClick}
      dangerouslySetInnerHTML={{ __html: childrenWithMedia || children }}
    />
  );
};

export default Message;
