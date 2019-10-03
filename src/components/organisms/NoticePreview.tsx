import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import { Contributor } from '../atoms';
import DetailsContainer from './NoticeDetails/DetailsContainer';
import DetailsContent from './NoticeDetails/DetailsContent';
import DetailsMeta from './NoticeDetails/DetailsMeta';
import Message from './NoticeDetails/Message';
import Date from './NoticeDetails/Date';
import { Contribution } from 'app/lmem/notice';
import Avatar from 'components/molecules/Avatar/Avatar';

const DetailsMetaValue = styled.div`
  margin-left: 10px;
`;

interface NoticePreviewProps {
  contribution: Contribution;
}
class NoticePreview extends PureComponent<NoticePreviewProps> {
  render() {
    const {
      contribution: { message, created, contributor },
      children
    } = this.props;

    return (
      <DetailsContainer>
        <DetailsContent>
          <DetailsMeta>
            <Avatar contributor={contributor} size="small" />
            <DetailsMetaValue>
              <Date>Le {format(created, 'DD/MM/YYYY')}</Date>
              <Contributor>{contributor.name} :</Contributor>
            </DetailsMetaValue>
          </DetailsMeta>

          <Message>{message}</Message>
        </DetailsContent>
        {children}
      </DetailsContainer>
    );
  }
}

export default NoticePreview;
