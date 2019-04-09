import React from 'react';
import styled from 'styled-components';

const MessageBlock = styled.div`
  p {
    margin: 6px 0 12px;
    font-size: 15px;
    line-height: 1.4;
    color: ${props => props.theme.primaryColor};
  }
`;

interface Props {
  children: string;
}
const Message = ({ children }: Props) => (
  <MessageBlock dangerouslySetInnerHTML={{ __html: children }} />
);

export default Message;
