import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Notice } from '@dismoi/domain/notice';
import { LoadingBig } from '@dismoi/ui/atoms/icons';
import { CenterContainer, Link, LoadingRotator } from '@dismoi/ui/atoms';
import ProfileNoticeListItem from './ProfileNoticeListItem';

const ProfileNoticeList = styled.section``;

export interface ProfileNoticeListProps {
  loading?: boolean;
  notices: Notice[];
  seeNoticeInContext: (notice: Notice) => () => void;
  fetchMoreNotices: () => void;
  fetchedAll: boolean;
}

export const ProfileNoticeListContent = ({
  loading,
  notices = [],
  seeNoticeInContext,
  fetchMoreNotices,
  fetchedAll,
}: ProfileNoticeListProps) => {
  const { t } = useTranslation();

  return typeof loading === 'undefined' ? null : (
    <ProfileNoticeList>
      {loading && (
        <LoadingRotator>
          <LoadingBig />
        </LoadingRotator>
      )}
      {((notices.length === 0 && !loading) || fetchedAll) && (
        <div> {t('profiles:common.no_more_contribution')}</div>
      )}
      {notices.map((notice) => (
        <ProfileNoticeListItem
          loading={false}
          notice={notice}
          seeInContext={seeNoticeInContext(notice)}
          key={notice.id}
        />
      ))}
      {notices.length > 0 && !loading && !fetchedAll && (
        <CenterContainer>
          <Link onClick={fetchMoreNotices}>
            {t('profiles:action.see_more')}
          </Link>
        </CenterContainer>
      )}
    </ProfileNoticeList>
  );
};

export default ProfileNoticeListContent;
