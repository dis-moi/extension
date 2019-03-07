import React from 'react';
import { NoNotice } from '../../atoms/icons/illustrations';
import { NoNoticeTitle, NoNoticeImg } from '../../atoms/Notification';
import { AddNotice } from '../../molecules';
import { Notification } from '../../organisms';

export default ({ close }) => {
  return (
    <Notification close={close}>
      <NoNoticeImg>
        <NoNotice />
      </NoNoticeImg>

      <NoNoticeTitle>Il n’y a plus de recommandation ici</NoNoticeTitle>

      <AddNotice />
    </Notification>
  );
};
