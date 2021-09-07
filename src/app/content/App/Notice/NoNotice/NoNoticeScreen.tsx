import React from 'react';
import { Trans } from 'react-i18next';
import styled from 'styled-components';
import { ContentWrapperBackground } from 'components/atoms';
import SubmitContributionForm from '../../Contribute/ContributeScreen/SubmitContributionForm';
import Title from './Title';

const Container = styled.div`
  padding-right: 5px;
  padding-left: 5px;
`;

export default () => {
  return (
    <>
      <Title>
        <Trans i18nKey={'view.contributions.disclaimer_no_post'} />
      </Title>
      <Container>
        <ContentWrapperBackground>
          <SubmitContributionForm />
        </ContentWrapperBackground>
      </Container>
    </>
  );
};
