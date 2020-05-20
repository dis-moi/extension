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

const NoticeURL = styled.span`
  display: inline-block;
  max-width: 30%;
  white-space: nowrap;
  overflow: hidden;
  vertical-align: bottom;
  text-overflow: ellipsis;
`;

const NoticeBottomLine = styled.div`
  display: flex;
  align-items: center;
  margin-top: ${props => props.theme.fontSizeDefault};
  font-size: 14px;

  & > ${BorderButton} {
    margin-left: 20px;
  }

  @media (max-width: ${props => props.theme.tabletWidth}) {
    display: block;
    font-size: ${props => props.theme.fontSizeDefault};

    & > ${BorderButton} {
      width: 100%;
      margin-top: ${props => props.theme.marginS};
      margin-left: 0;
    }
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
      {notice.exampleUrl && (
        <NoticeTopLine>
          <NoticeHighlight>
            Message épinglé sur <NoticeURL>{notice.exampleUrl}</NoticeURL>
          </NoticeHighlight>{' '}
          et d&apos;autres pages web
        </NoticeTopLine>
      )}
      <Paragraph dangerouslySetInnerHTML={{ __html: notice.message }} />
      <NoticeBottomLine>
        Visible depuis le {format(notice.created, 'DD/MM/YYYY')}
        <BorderButton onClick={seeInContext} disabled={!notice.exampleUrl}>
          Voir en context
        </BorderButton>
      </NoticeBottomLine>
    </Box>
  );
};

export default styled(ProfileNoticeListItem)``;
