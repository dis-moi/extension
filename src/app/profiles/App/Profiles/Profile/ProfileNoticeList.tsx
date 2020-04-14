import React from 'react';
import { Loading } from 'components/atoms/icons';
import { Notice } from 'app/lmem/notice';
import { trilean } from 'types';

export interface ProfileNoticeListProps {
  loading: trilean;
  notices: Notice[];
}

export const ProfileNoticeList = ({
  loading,
  notices = []
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
    <ul>
      {notices.map(notice => (
        <li
          key={notice.id}
          dangerouslySetInnerHTML={{ __html: notice.message }}
        />
      ))}
    </ul>
  );
};

export default ProfileNoticeList;
