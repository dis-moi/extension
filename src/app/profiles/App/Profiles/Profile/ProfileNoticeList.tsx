import React from 'react';
import styled from 'styled-components';
import { Notice } from 'app/lmem/notice';
import ProfileNoticeListItem from './ProfileNoticeListItem';
import { LoadingBig } from 'components/atoms/icons';
import { LoadingRotator } from 'components/atoms';

const ProfileNoticeList = styled.section``;

export interface ProfileNoticeListProps {
  loading?: boolean;
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
    return (
      <LoadingRotator>
        <LoadingBig />
      </LoadingRotator>
    );
  }

  if (notices.length === 0) {
    return <div>Pas d&apos;autres contributions</div>;
  }

  return (
    <ProfileNoticeList>
      {notices.map(notice => (
        <ProfileNoticeListItem
          loading={false}
          notice={notice}
          seeInContext={seeNoticeInContext(notice)}
          key={notice.id}
        />
      ))}
    </ProfileNoticeList>
  );
};

export default ProfileNoticeListContent;
