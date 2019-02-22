import React from 'react';
import PropTypes from 'prop-types';
import { recommendation as NoticeType } from '../../../../propTypes';
import { NotificationContentTitle } from '../../../../../components/atoms';
import { AddNotice, NoNotice } from '../../../../../components/molecules';
import { Notification, Notice } from '../../../../../components/organisms';
import { findType } from '../../../../lmem';

const List = ({
  notices, dismiss, undismiss, close
}) => {
  return (
    <Notification close={close}>
      <NotificationContentTitle>Notifications pour cette page</NotificationContentTitle>
      {notices.slice(0, 2).map(({
        id, title, contributor: { name }, resource: { url }, criteria, dismissed, disliked
      }) => (
        <Notice
          key={id}
          id={id}
          type={findType(criteria)}
          message={title}
          contributor={name}
          source={url}
          dismiss={dismiss}
          undismiss={undismiss}
          dismissed={dismissed}
          disliked={disliked}
        />
      ))}
      {notices.length === 0 && <NoNotice />}
      <AddNotice
        as="a"
        href="https://form.jotformeu.com/82702852284358"
        target="_blank"
        rel="noopener noreferrer"
      />
    </Notification>
  );
};

List.propTypes = {
  notices: PropTypes.arrayOf(PropTypes.shape(NoticeType)),
  dismiss: PropTypes.func.isRequired,
  undismiss: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
};

List.defaultProps = {
  notices: [],
};

export default List;
