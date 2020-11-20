import React from 'react';
import styled from 'styled-components';
import FeaturedNotice from './FeaturedNotice';
import { LoadingRotator } from 'components/atoms';
import { LoadingBig } from 'components/atoms/icons';
import { NoticeItem } from 'app/lmem/notice';
import { StatefulContributor } from 'app/lmem/contributor';

export interface FeaturedNoticesProps {
  loading?: boolean;
  notices: NoticeItem[];
  seeNoticeInContext: (notice: NoticeItem) => () => void;
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
