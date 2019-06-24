import React, { PureComponent } from 'react';
import { format } from 'date-fns';
import { Contributor, CenterContainer } from '../atoms';
import DetailsContainer from './NoticeDetails/DetailsContainer';
import DetailsContent from './NoticeDetails/DetailsContent';
import DetailsMeta from './NoticeDetails/DetailsMeta';
import Message from './NoticeDetails/Message';
import Date from './NoticeDetails/Date';
import IntentionIcon from '../atoms/Intentions/IntentionIcon';
import { Contribution } from 'app/lmem/notice';

interface NoticePreviewProps {
  contribution: Contribution;
}
class NoticePreview extends PureComponent<NoticePreviewProps> {
  render() {
    const {
      contribution: { intention, message, created, email },
      children
    } = this.props;

    return (
      <DetailsContainer>
        <DetailsContent>
          <DetailsMeta>
            <Date>Le {format(created, 'DD/MM/YYYY')}</Date>
            <Contributor>{email} :</Contributor>
            <IntentionIcon active intention={intention} />
          </DetailsMeta>

          <Message>{message}</Message>
        </DetailsContent>
        {children}
      </DetailsContainer>
    );
  }
}

export default NoticePreview;
