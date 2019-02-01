import React from 'react';
import PropTypes from 'prop-types';
import { NoticeDetails, Notification } from '../../../../../components/organisms';
import { recommendation as NoticeType } from '../../../../propTypes';
import { findType } from '../../../../lmem/typeOfCriteria';

const Details = ({
  notice: {
    id, resource: { url }, contributor: { name }, title, criteria, description, isApproved
  },
  approve,
  disapprove,
  close,
}) => {
  return (
    <Notification title={title} close={close}>
      <NoticeDetails
        id={id}
        type={findType(criteria)}
        date="03 déc. 2018"
        message={description}
        contributor={name}
        source={url}
        approves={21}
        dislikes={3}
        approve={approve}
        disapprove={disapprove}
        approved={isApproved}
        details
      />
    </Notification>
  );
};

Details.propTypes = {
  notice: PropTypes.shape(NoticeType).isRequired,
  approve: PropTypes.func,
  disapprove: PropTypes.func,
  close: PropTypes.func,
};

Details.defaultProps = {
  approve: () => {},
  disapprove: () => {},
  close: null,
};

export default Details;
