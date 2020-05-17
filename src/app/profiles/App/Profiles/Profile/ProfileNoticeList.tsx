import React from 'react';
import styled from 'styled-components';
import { LogoLetter } from 'components/atoms/icons';
import { Notice } from 'app/lmem/notice';
import { trilean } from 'types';
import ProfileNoticeListItem from './ProfileNoticeListItem';
import { LoadingRotator } from 'components/atoms';

const ProfileNoticeList = styled.section``;

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
    return (
      <LoadingRotator>
        <LogoLetter />
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
