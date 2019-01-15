import React from 'react';
import { NoNotice } from '../../atoms/icons/illustrations';
import { NoNoticeTitle, NoNoticeImg } from '../../atoms/Notification';
import { AddNotice } from '../../molecules';
import { Notification } from '../../organisms';

export default ({ match }) => {
  return (
    <Notification>
      <NoNoticeImg>
        <NoNotice />
      </NoNoticeImg>

      <NoNoticeTitle>Il n’y a plus de bulle ici</NoNoticeTitle>

      <AddNotice />
    </Notification>
  );
};
