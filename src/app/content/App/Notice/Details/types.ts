import { RouteComponentProps } from 'react-router';
import { EnhancedNotice } from 'app/lmem/notice';
import { FeedbackOnNoticeAction } from 'app/actions/recommendations';

interface OwnProps {
  notice?: EnhancedNotice;
  like: (id: number) => FeedbackOnNoticeAction;
  unlike: (id: number) => FeedbackOnNoticeAction;
  dislike: (id: number) => FeedbackOnNoticeAction;
  undislike: (id: number) => FeedbackOnNoticeAction;
  close?: () => void;
}

export type DetailsProps = OwnProps & RouteComponentProps;
