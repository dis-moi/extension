import React from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import { BorderButton, Box, LoadingRotator, Paragraph } from 'components/atoms';
import { Notice } from 'app/lmem/notice';
import { LogoLetter } from 'components/atoms/icons';

const Loading = styled(LoadingRotator)`
  margin-bottom: 20px;
`;

const NoticeTopLine = styled.div`
  margin-bottom: ${props => props.theme.fontSizeDefault};
`;

const NoticeHighlight = styled.strong``;

const NoticeBottomLine = styled.div`
  display: flex;
  align-items: center;
  margin-top: ${props => props.theme.fontSizeDefault};
  font-size: 14px;

  & > ${BorderButton} {
    margin-left: 20px;
  }
`;

export interface ProfileNoticeListItemProps {
  notice?: Notice;
  loading?: boolean;
  seeInContext: () => void;
  className?: string;
}

export const ProfileNoticeListItem = ({
  loading,
  notice,
  seeInContext,
  className
}: ProfileNoticeListItemProps) => {
  if (typeof loading === 'undefined') {
    return null;
  }

  if (loading) {
    return (
      <Loading>
        <LogoLetter />
      </Loading>
    );
  }

  if (!notice) {
    return null;
  }

  return (
    <Box className={className}>
      <NoticeTopLine>
        <NoticeHighlight>Message épinglé sur {notice.url}</NoticeHighlight> et
        d&apos;autres pages web
      </NoticeTopLine>
      <Paragraph dangerouslySetInnerHTML={{ __html: notice.message }} />
      <NoticeBottomLine>
        Visible depuis le {format(notice.created, 'DD/MM/YYYY')}
        <BorderButton onClick={seeInContext}>Voir en context</BorderButton>
      </NoticeBottomLine>
    </Box>
  );
};

export default styled(ProfileNoticeListItem)``;
