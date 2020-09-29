import React from 'react';
import styled from 'styled-components';
import { NoticeWithContributor } from 'app/lmem/notice';
import ProfileNoticeListItem from './ProfileNoticeListItem';
import { LoadingBig } from 'components/atoms/icons';
import { CenterContainer, Link, LoadingRotator } from 'components/atoms';

const ProfileNoticeList = styled.section``;

export interface ProfileNoticeListProps {
  loading?: boolean;
  notices: NoticeWithContributor[];
  seeNoticeInContext: (notice: NoticeWithContributor) => () => void;
  fetchMoreNotices: () => void;
  fetchedAll: boolean;
}

export const ProfileNoticeListContent = ({
  loading,
  notices = [],
  seeNoticeInContext,
  fetchMoreNotices,
  fetchedAll
}: ProfileNoticeListProps) =>
  typeof loading === 'undefined' ? null : (
    <ProfileNoticeList>
      {loading && (
        <LoadingRotator>
          <LoadingBig />
        </LoadingRotator>
      )}
      {((notices.length === 0 && !loading) || fetchedAll) && (
        <div>Pas d&apos;autres contributions</div>
      )}
      {notices &&
        notices.map(notice => (
          <ProfileNoticeListItem
            loading={false}
            notice={notice}
            seeInContext={seeNoticeInContext(notice)}
            key={notice.id}
          />
        ))}
      {notices && notices.length && !loading && !fetchedAll && (
        <CenterContainer>
          <Link onClick={fetchMoreNotices}>Voir plus</Link>
        </CenterContainer>
      )}
    </ProfileNoticeList>
  );

export default ProfileNoticeListContent;
