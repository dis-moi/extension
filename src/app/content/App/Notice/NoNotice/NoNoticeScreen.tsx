import React from 'react';
import styled from 'styled-components';
import { Link as ReactRouterDomLink } from 'react-router-dom';
import Title from './Title';
import ButtonContainer from './ButtonContainer';
import { BackgroundButton } from 'components/atoms';
import AddNoticeButton from 'components/atoms/Button/AddNoticeButton/AddNoticeButton';

const Container = styled(ButtonContainer)`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  font-size: 16px;
  padding-right: 40px;
  padding-left: 40px;
`;

const Content = styled.div`
  text-align: center;

  & > a {
    box-sizing: border-box;
    width: 118px;
    padding-top: 6px;
    padding-bottom: 6px;
  }
`;

const Separator = styled.div`
  padding-top: 6px;
  line-height: 1;
`;

const Paragraph = styled.p`
  margin: 8px 0 0;
  font-size: 15px;
  font-weight: 500;
`;

export default () => (
  <>
    <Title>
      Pas encore de post sur <br /> cette page web
    </Title>
    <Container>
      <Content>
        <AddNoticeButton />
        <Paragraph>une info, un conseil</Paragraph>
      </Content>
      <Separator>ou</Separator>
      <Content>
        <BackgroundButton as={ReactRouterDomLink} to="/question">
          Demander
        </BackgroundButton>
        <Paragraph>une info, un conseil</Paragraph>
      </Content>
    </Container>
  </>
);
