import React from 'react';
import { Loading } from 'components/atoms/icons';
import { Notice } from 'app/lmem/notice';
import { trilean } from 'types';

export interface ProfileNoticeListProps {
  loading: trilean;
  notice?: Notice;
}

export const FeaturedNotice = ({ loading, notice }: ProfileNoticeListProps) => {
  if (typeof loading === 'undefined') {
    return null;
  }

  if (loading) {
    return <Loading />;
  }

  if (!notice) {
    return null;
  }

  return (
    <article
      style={{ border: '1px solid red' }}
      dangerouslySetInnerHTML={{ __html: notice.message }}
    />
  );
};

export default FeaturedNotice;
