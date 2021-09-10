import React from 'react';
import { Trans } from 'react-i18next';
import styled from 'styled-components';
import { ContentWrapperBackground } from 'components/atoms';
import SubmitContributionForm from '../../Contribute/ContributeScreen/SubmitContributionForm';
import Title from './Title';

const NoNoticeTitle = styled(Title)`
  margin-right: 42px;
  margin-left: 42px;

  span {
    display: block;
    margin-top: 16px;
    margin-right: -20px;
    margin-left: -20px;
    font-size: 16px;
    font-weight: normal;
  }
`;

const NoNoticeContentWrapperBackground = styled(ContentWrapperBackground)`
  height: auto;
  background: none;
  margin: 16px 26px;
  padding: 0;

  textarea {
    min-height: 148px;
  }
`;

export default () => {
  return (
    <>
      <NoNoticeTitle>
        <Trans i18nKey={'view.contributions.disclaimer_no_post'}>
          <>Pas encore de contribution sur cette page</>
          <span>Soyez le premier à poster une info, un conseil ici</span>
        </Trans>
      </NoNoticeTitle>
      <NoNoticeContentWrapperBackground>
        <SubmitContributionForm />
      </NoNoticeContentWrapperBackground>
    </>
  );
};
