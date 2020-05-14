import React from 'react';
import styled from 'styled-components';
import { Box, Title2 } from 'components/atoms';
import { Loading } from 'components/atoms/icons';
import { Notice } from 'app/lmem/notice';
import { trilean } from 'types';
import ProfileNoticeListItem from './ProfileNoticeListItem';

const ProfileNoticeList = styled.section`
  & > Box {
    margin-top: 20px;
  }
`;

export interface ProfileNoticeListProps {
  loading: trilean;
  notices: Notice[];
  seeNoticeInContext: (notice: Notice) => () => void;
}

export const ProfileNoticeListContent = ({
  loading,
  notices = [],
  seeNoticeInContext
}: ProfileNoticeListProps) => {
  if (typeof loading === 'undefined') {
    return null;
  }

  if (loading) {
    return <Loading />;
  }

  if (notices.length === 0) {
    return <div>Pas d&apos;autres contributions</div>;
  }

  return (
    <ProfileNoticeList>
      <Title2>Ses dernières contributions</Title2>
      {notices.map(notice => (
        <Box key={notice.id}>
          <ProfileNoticeListItem
            notice={notice}
            seeInContext={seeNoticeInContext(notice)}
          />
        </Box>
      ))}
    </ProfileNoticeList>
  );
};

export default ProfileNoticeListContent;
