import { RouteComponentProps } from 'react-router';
import { EnhancedNotice } from 'app/lmem/notice';
import { FeedbackOnNoticeAction, ReadNoticeAction } from 'app/actions/notices';

interface OwnProps {
  notice?: EnhancedNotice;
  like: (id: number) => FeedbackOnNoticeAction;
  unlike: (id: number) => FeedbackOnNoticeAction;
  dislike: (id: number) => FeedbackOnNoticeAction;
  undislike: (id: number) => FeedbackOnNoticeAction;
  view: (id: number) => ReadNoticeAction;
  close?: () => void;
}

export type DetailsProps = OwnProps & RouteComponentProps;
