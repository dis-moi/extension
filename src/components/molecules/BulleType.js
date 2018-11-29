import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import { BulleTypeBackground } from '../atoms';
import * as bulleTypeIcons from '../atoms/icons/types';

const BulleType = ({ type, theme }) => {
  const BulleTypeIcon = bulleTypeIcons[type];
  const style = theme.bulleTypes[type];

  return (
    <BulleTypeBackground color={style && style.background}>
      {BulleTypeIcon && <BulleTypeIcon color={style && style.color} />}
    </BulleTypeBackground>
  );
};

BulleType.propTypes = {
  type: PropTypes.string,
  theme: PropTypes.objectOf(PropTypes.any).isRequired,
};

BulleType.defaultProps = {
  type: null,
};

export default withTheme(BulleType);