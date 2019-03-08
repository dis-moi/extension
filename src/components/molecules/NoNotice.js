import React, { Fragment } from 'react';
import { NoNoticeImg, NoNoticeTitle } from '../atoms/Notification';
import { NoNotice as NoNoticeIcon } from '../atoms/icons/illustrations';

export default () => (
  <Fragment>
    <NoNoticeImg>
      <NoNoticeIcon />
    </NoNoticeImg>

    <NoNoticeTitle>Il n’y a plus de recommandation ici</NoNoticeTitle>
  </Fragment>
);
