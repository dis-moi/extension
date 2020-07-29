import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import { ContributorName } from '../atoms';
import DetailsContainer from './NoticeDetails/DetailsContainer';
import DetailsContent from './NoticeDetails/DetailsContent';
import DetailsMeta from './NoticeDetails/DetailsMeta';
import Message from './NoticeDetails/Message';
import Date from './NoticeDetails/Date';
import { Contribution } from 'app/lmem/notice';
import Avatar from 'components/molecules/Avatar/Avatar';
import linkify from 'app/utils/linkify';

const DetailsMetaValue = styled.div`
  margin-left: 10px;
`;

const Container = styled(DetailsContainer)`
  margin: 10px 13px;
  height: calc(100% - 20px);
  background-color: #fff;
  border-radius: 8px;
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
      <Container>
        <DetailsContent>
          <DetailsMeta>
            <Avatar contributor={contributor} size="small" />
            <DetailsMetaValue>
              <Date>Le {format(created, 'DD/MM/YYYY')}</Date>
              <ContributorName>{contributor.name} :</ContributorName>
            </DetailsMetaValue>
          </DetailsMeta>

          <Message>{linkify(message)}</Message>
        </DetailsContent>
        {children}
      </Container>
    );
  }
}

export default NoticePreview;
