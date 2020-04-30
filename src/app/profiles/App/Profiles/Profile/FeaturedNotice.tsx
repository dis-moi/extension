import React from 'react';
import { BorderButton, Box, Paragraph } from 'components/atoms';
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
    <Box>
      <p>Message épinglé sur blabla.fr/sdsqdfdsf… et d&apos;autres pages web</p>
      <Paragraph dangerouslySetInnerHTML={{ __html: notice.message }} />
      <div>
        Visible depuis le 01/02/20
        <BorderButton>Voir en context</BorderButton>
      </div>
    </Box>
  );
};

export default FeaturedNotice;
