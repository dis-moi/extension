import React, { PureComponent } from 'react';
import { TFunction } from 'i18next';
import { withTranslation } from 'react-i18next';
import styled from 'styled-components';
import { ContributorName } from '../atoms';
import DetailsContainer from './NoticeDetails/DetailsContainer';
import DetailsContent from './NoticeDetails/DetailsContent';
import DetailsMeta from './NoticeDetails/DetailsMeta';
import Message from './NoticeDetails/Message';
import Date from './NoticeDetails/Date';
import { Contribution } from 'app/lmem/notice';
import Avatar from 'components/molecules/Avatar/Avatar';
import linkify from 'app/utils/linkify';
import lineBreaksToBr from 'app/utils/lineBreaksToBr';

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
  t: TFunction;
}
class NoticePreview extends PureComponent<NoticePreviewProps> {
  render() {
    const {
      contribution: { message, created, contributor },
      children,
      t
    } = this.props;

    return (
      <Container>
        <DetailsContent>
          <DetailsMeta>
            <Avatar contributor={contributor} size="small" />
            <DetailsMetaValue>
              <Date>{t('date.medium', { date: created })}</Date>
              <ContributorName>{contributor.name} :</ContributorName>
            </DetailsMetaValue>
          </DetailsMeta>

          <Message>{lineBreaksToBr(linkify(message))}</Message>
        </DetailsContent>
        {children}
      </Container>
    );
  }
}

export default withTranslation()(NoticePreview);
