import React, { useState } from 'react';
import styled from 'styled-components';
import { NewsState } from 'app/content/store/reducers/news.reducer';
import CloseButton from '../NotificationHeader/CloseButton';
import { Paragraph } from '../../../atoms';
import { keyframes } from '../../../../types/styled-components';

interface NotificationNewsProps {
  news: NewsState['message'];
}

const defileAnim = keyframes`
  from {
    margin-left: 0;
  } 
  to {
    margin-left: -100%;
  }

`;

const Container = styled.div`
  background: white;
  border: 1px solid #eeeeee;
  display: flex;
  align-content: space-between;
  padding: 8px;
`;

const DelifDiv = styled.div`
  width: 343px;
  height: calc(1em + 8px);
  overflow: hidden;
  p {
    white-space: nowrap;
    display: inline-block;
  }
  p:hover {
    animation: ${defileAnim} 6s infinite linear;
  }
`;

const NotificationNews = ({ news }: NotificationNewsProps) => {
  const [open, setOpen] = useState(true);

  if (!news || !open) return null;
  return (
    <Container>
      <DelifDiv>
        <Paragraph>{news}</Paragraph>
      </DelifDiv>
      <CloseButton onClick={() => setOpen(false)} />
    </Container>
  );
};

export default NotificationNews;
