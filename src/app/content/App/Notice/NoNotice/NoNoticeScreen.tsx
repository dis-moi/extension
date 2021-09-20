import React from 'react';
import styled from 'styled-components';
import { ContentWrapperBackground } from 'components/atoms';
import SubmitContributionForm from '../../Contribute/ContributeScreen/SubmitContributionForm';

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
      <NoNoticeContentWrapperBackground>
        <SubmitContributionForm />
      </NoNoticeContentWrapperBackground>
    </>
  );
};
