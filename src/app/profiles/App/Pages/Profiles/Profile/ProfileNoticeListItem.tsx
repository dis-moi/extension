import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { BorderButton, Box, LoadingRotator, Paragraph } from 'components/atoms';
import { Notice } from 'app/lmem/notice';
import { LoadingBig, Pin } from 'components/atoms/icons';
import { stripUrlProtocol } from 'app/utils/stripUrlProtocol';

const Loading = styled(LoadingRotator)`
  margin-bottom: 20px;
`;

const NoticeTopLine = styled.div`
  margin-top: 20px;
  margin-bottom: 26px;

  & > svg {
    margin-right: 5px;
    vertical-align: bottom;
  }
`;

const NoticeHighlight = styled.strong``;

const NoticeURL = styled.span`
  display: inline-block;
  max-width: 38%;
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
  featured?: boolean;
}

export const ProfileNoticeListItem = ({
  loading,
  notice,
  seeInContext,
  className
}: ProfileNoticeListItemProps) => {
  const { t } = useTranslation();

  if (typeof loading === 'undefined') {
    return null;
  }

  if (loading) {
    return (
      <Loading>
        <LoadingBig />
      </Loading>
    );
  }

  if (!notice) {
    return null;
  }

  return (
    <Box className={className}>
      {notice.screenshot && (
        <img
          style={{ width: '100%' }}
          src={notice.screenshot}
          alt={t('notice.screenshot_alt', {
            exampleMatchingUrl: notice.exampleMatchingUrl
          })}
        />
      )}
      <Paragraph dangerouslySetInnerHTML={{ __html: notice.strippedMessage }} />
      {notice.exampleMatchingUrl && (
        <NoticeTopLine>
          <Pin />
          <NoticeHighlight>
            {t('notice.pined_on')}{' '}
            <NoticeURL>{stripUrlProtocol(notice.exampleMatchingUrl)}</NoticeURL>
          </NoticeHighlight>{' '}
          {t('notice.and_others_pages')}
        </NoticeTopLine>
      )}
      <NoticeBottomLine>
        {t('notice.since', { date: new Date(notice.created) })}
        <BorderButton
          onClick={seeInContext}
          disabled={!notice.exampleMatchingUrl}
        >
          {t('action.see_context')}
        </BorderButton>
      </NoticeBottomLine>
    </Box>
  );
};

export default styled(ProfileNoticeListItem)``;
