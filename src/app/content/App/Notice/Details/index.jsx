import React from 'react';
import PropTypes from 'prop-types';
import { NoticeDetails, Notification } from '../../../../../components/organisms';
import { recommendation as NoticeType } from '../../../../propTypes';
import { findType } from '../../../../lmem/typeOfCriteria';
import withConnect from './withConnect';

const Details = ({
  notice: {
    id, resource: { url }, contributor: { name }, criteria, description, liked, disliked
  },
  like, unlike,
  dislike, undislike,
  close,
}) => {
  return (
    <Notification title="Détail de la recommandation" close={close}>
      <NoticeDetails
        id={id}
        type={findType(criteria)}
        date="03 déc. 2018"
        message={description}
        contributor={name}
        source={url}
        likes={21}
        dislikes={3}
        like={like}
        unlike={unlike}
        dislike={dislike}
        undislike={undislike}
        liked={liked}
        disliked={disliked}
        details
      />
    </Notification>
  );
};

Details.propTypes = {
  notice: PropTypes.shape(NoticeType).isRequired,
  like: PropTypes.func.isRequired,
  unlike: PropTypes.func.isRequired,
  dislike: PropTypes.func.isRequired,
  undislike: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
};

export default withConnect(Details);
