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
  0% { transform: translateX(0); }
  100% { transform: translateX(-100%); }
`;

const Container = styled.div`
  display: flex;
  align-content: space-between;
  align-items: center;
  padding: 8px;
  background: white;
  border: 1px solid #eeeeee;
`;

const DelifDiv = styled.div<{ velocity: number }>`
  width: calc(100% - 24px);
  overflow: hidden;

  p {
    display: inline-block;
    white-space: nowrap;
    animation: ${defileAnim} ${props => props.velocity}s linear infinite;
    animation-play-state: paused;
  }

  p:hover {
    animation-play-state: running;
  }
`;

const NotificationNews = ({ news }: NotificationNewsProps) => {
  const [open, setOpen] = useState(true);

  if (!news || !open) return null;
  const velocity = news.length / 10;

  return (
    <Container>
      <DelifDiv velocity={velocity}>
        <Paragraph>{news}</Paragraph>
      </DelifDiv>

      <CloseButton onClick={() => setOpen(false)} />
    </Container>
  );
};

export default NotificationNews;
