import React from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import { BorderButton, Box, Paragraph } from 'components/atoms';
import { Notice } from 'app/lmem/notice';

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
  notice: Notice;
}

export const ProfileNoticeListItem = ({
  notice
}: ProfileNoticeListItemProps) => {
  return (
    <Box>
      <NoticeTopLine>
        <NoticeHighlight>Message épinglé sur {notice.url}</NoticeHighlight> et
        d&apos;autres pages web
      </NoticeTopLine>
      <Paragraph dangerouslySetInnerHTML={{ __html: notice.message }} />
      <NoticeBottomLine>
        Visible depuis le {format(notice.created, 'DD/MM/YYYY')}
        <BorderButton>Voir en context</BorderButton>
      </NoticeBottomLine>
    </Box>
  );
};

export default ProfileNoticeListItem;
