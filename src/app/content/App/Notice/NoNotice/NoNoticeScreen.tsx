import React from 'react';
import styled from 'styled-components';
import { Link as ReactRouterDomLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BackgroundButton } from 'components/atoms';
import AddNoticeButton from 'components/atoms/Button/AddNoticeButton/AddNoticeButton';
import Title from './Title';
import ButtonContainer from './ButtonContainer';
import { Textarea } from 'components/atoms/Forms';

const Container = styled.div`
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
  text-align: center;
`;

export default () => {
  const { t } = useTranslation();
  return (
    <>
      <Title>Pas encore de contribution sur cette page</Title>
      {/*<Title>{t('view.contributions.disclaimer_no_post')}</Title>*/}

      <Container>
        <Paragraph>
          Soyez le premier à poster une info, un conseil ici
        </Paragraph>

        <Textarea />

        <BackgroundButton>Poster</BackgroundButton>
      </Container>
    </>
  );
};
