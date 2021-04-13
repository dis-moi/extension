import React from 'react';
import styled from 'styled-components';
import { LoadingRotator } from 'components/atoms';
import { LoadingBig } from 'components/atoms/icons';
import { Notice } from 'app/lmem/notice';
import { StatefulContributor } from 'app/lmem/contributor';
import FeaturedNotice from './FeaturedNotice';

export interface FeaturedNoticesProps {
  loading?: boolean;
  notices: Notice[];
  seeNoticeInContext: (notice: Notice) => () => void;
  contributor?: StatefulContributor;
  className?: string;
}

const FeatureNoticesContainer = styled.section`
  margin-bottom: 40px;
`;

const FeaturedNotices = ({
  loading,
  notices,
  seeNoticeInContext,
  className
}: FeaturedNoticesProps) => {
  if (typeof loading === 'undefined') {
    return null;
  }

  return (
    <FeatureNoticesContainer className={className}>
      {loading ? (
        <LoadingRotator>
          <LoadingBig />
        </LoadingRotator>
      ) : (
        <>
          {notices.map(notice => (
            <FeaturedNotice
              key={notice.id}
              loading={false}
              notice={notice}
              seeInContext={seeNoticeInContext(notice)}
            />
          ))}
        </>
      )}
    </FeatureNoticesContainer>
  );
};

export default FeaturedNotices;
