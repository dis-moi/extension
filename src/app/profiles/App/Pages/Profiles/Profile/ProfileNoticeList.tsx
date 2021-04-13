import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import ProfileNoticeListItem from './ProfileNoticeListItem';
import { Notice } from 'app/lmem/notice';
import { LoadingBig } from 'components/atoms/icons';
import { CenterContainer, Link, LoadingRotator } from 'components/atoms';

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
  fetchedAll
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
      {notices.map(notice => (
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
