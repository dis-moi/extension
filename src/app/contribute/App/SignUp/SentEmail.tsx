import React from 'react';
import { Paragraph, Title } from 'components/atoms';
import { Wrapper } from '../components';

const SentEmail = () => {
  return (
    <Wrapper>
      <Title>Congrats</Title>

      <Paragraph>
        Please check your email to complete registration and start posting.
      </Paragraph>
    </Wrapper>
  );
};

export default SentEmail;
