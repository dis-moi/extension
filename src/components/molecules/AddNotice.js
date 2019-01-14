import React from 'react';
import PropTypes from 'prop-types';
import { AddNoticeLink, CenterContainer, } from '../atoms';
import { Add } from '../atoms/icons';

const AddNotice = ({ onClick }) => (
  <CenterContainer>
    <AddNoticeLink onClick={onClick}>
      <Add />
      Créer votre notification
    </AddNoticeLink>
  </CenterContainer>
);

AddNotice.propTypes = {
  onClick: PropTypes.func,
};

AddNotice.defaultProps = {
  onClick: () => { },
};

export default AddNotice;