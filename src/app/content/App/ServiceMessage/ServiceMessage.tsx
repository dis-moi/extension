import React from 'react';
import styled from 'styled-components';
import { BackgroundButton } from 'components/atoms';
import { ServiceMessageAction } from 'app/content/reducers/serviceMessage.reducer';

const Content = styled.section`
  margin-top: 50px;
  font-size: 14px;
  color: ${props => props.theme.primaryColor};
  text-align: center;
`;

const Text = styled.p`
  margin: 0;

  &:last-of-type {
    margin-bottom: 34px;
  }
`;

const Button = styled(BackgroundButton)`
  margin-left: auto;
  margin-right: auto;
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
      <Button onClick={openOnboarding(action.url)}>{action.label}</Button>
    )}
  </Content>
);
