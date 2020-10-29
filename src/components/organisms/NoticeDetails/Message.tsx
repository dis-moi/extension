import React, { MouseEventHandler } from 'react';
import styled from 'styled-components';

const MessageBlock = styled.div`
  max-height: 200px;
  padding-top: 12px;
  overflow-y: auto;

  p {
    margin: 0;
    font-size: 15px;
    line-height: 1.4;
    color: ${props => props.theme.primaryColor};
  }
`;

interface Props {
  children: string;
  onClick?: MouseEventHandler;
}
const Message = ({ children, onClick }: Props) => (
  <MessageBlock
    onClick={onClick}
    dangerouslySetInnerHTML={{ __html: children }}
  />
);

export default Message;
