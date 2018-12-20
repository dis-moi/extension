import React from 'react';
import PropTypes from 'prop-types';
import { AddBulleLink, CenterContainer, } from '../atoms';
import { Add } from '../atoms/icons';

const AddBulle = ({ onClick }) => (
  <CenterContainer>
    <AddBulleLink onClick={onClick}>
      <Add />
      Créer votre bulle
    </AddBulleLink>
  </CenterContainer>
);

AddBulle.propTypes = {
  onClick: PropTypes.func,
};

AddBulle.defaultProps = {
  onClick: () => { },
};

export default AddBulle;