import React from 'react';
import PropTypes from 'prop-types';
import { AddBulleLink, BulleContainer, } from '../atoms';

const AddBulle = ({ onClick }) => (
  <AddBulleLink onClick={onClick}>
    <span>+</span> 
    Créer votre bulle
  </AddBulleLink>
);

AddBulle.propTypes = {
  onClick: PropTypes.func,
};

AddBulle.defaultProps = {
  onClick: () => { },
};

export default AddBulle;