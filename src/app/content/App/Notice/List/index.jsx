import React from "react";
import PropTypes from "prop-types";
import { recommendation as NoticeType } from "app/propTypes";
import Notification from "components/organisms/Notification";
import Notice  from "components/organisms/Notice/Notice";
import AddNotice from "components/molecules/AddNotice";
import { findType } from "app/lmem";
import NoNotice from "./NoNotice";
import withConnect from "./withConnect";

export const List = ({ notices, dismiss, undismiss, close }) => {
  return (
    <Notification
      title="Notifications pour cette page"
      hasNotices
      close={close}
    >
      {notices
        .slice(0, 2)
        .map(
          ({
            id,
            description,
            contributor: { name },
            resource: { url },
            criteria,
            dismissed,
            disliked
          }) => (
            <Notice
              key={id}
              id={id}
              type={findType(criteria)}
              message={description}
              contributor={name}
              source={url}
              dismiss={dismiss}
              undismiss={undismiss}
              dismissed={dismissed}
              disliked={disliked}
            />
          )
        )}
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
  close: PropTypes.func.isRequired
};

List.defaultProps = {
  notices: []
};

export default withConnect(List);
