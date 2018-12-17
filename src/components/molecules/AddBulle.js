import React from 'react';
import PropTypes from 'prop-types';
import { AddBulleLink, CenterContainer, } from '../atoms';

const AddBulle = ({ onClick }) => (
  <CenterContainer>
    <AddBulleLink onClick={onClick}>
      <span>+</span>
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