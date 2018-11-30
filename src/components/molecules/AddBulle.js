import React from 'react';
import PropTypes from 'prop-types';
import { AddBulleLink, BulleContainer, } from '../atoms';
import { Arrow, Bubble } from '../atoms/icons';

const AddBulle = ({ onClick }) => (
  <BulleContainer>
    <AddBulleLink onClick={onClick}>
      <Bubble />
      <span>Ajouter une bulle</span>
      <Arrow />
    </AddBulleLink>
  </BulleContainer>
);

AddBulle.propTypes = {
  onClick: PropTypes.func,
};

AddBulle.defaultProps = {
  onClick: () => {},
};

export default AddBulle;