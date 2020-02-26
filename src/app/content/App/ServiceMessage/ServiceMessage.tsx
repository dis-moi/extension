import React from 'react';
import styled from 'styled-components';
import { ServiceMessageAction } from 'app/lmem/ServiceMessage';
import ServiceMessageActionButton from './ServiceMessageActionButton';

const Content = styled.section`
  margin-top: 50px;
  font-size: 16px;
  color: ${props => props.theme.primaryColor};
  text-align: center;
  font-weight: bold;
`;

const Text = styled.p`
  margin: 0;

  &:last-of-type {
    margin-bottom: 34px;
  }
`;

interface ServiceMessageScreenProps {
  messages: string[];
  action?: ServiceMessageAction | null;
  openOnboarding: (pathname: string) => () => void;
}

export default ({
  messages,
  action,
  openOnboarding
}: ServiceMessageScreenProps) => (
  <Content>
    {messages.map((message, i) => (
      <Text key={`messages[${i}]`}>{message}</Text>
    ))}
    {action && (
      <ServiceMessageActionButton {...action} openOnboarding={openOnboarding} />
    )}
  </Content>
);
