import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import { NoticeTypeBackground } from '../atoms';
import * as noticeTypeIcons from '../atoms/icons/types';

const NoticeType = ({ type, theme }) => {
  const NoticeTypeIcon = noticeTypeIcons[type];
  const style = theme.noticeTypes[type];

  return (
    <NoticeTypeBackground color={style && style.background}>
      {NoticeTypeIcon && <NoticeTypeIcon />}
    </NoticeTypeBackground>
  );
};

NoticeType.propTypes = {
  type: PropTypes.string,
  theme: PropTypes.objectOf(PropTypes.any).isRequired,
};

NoticeType.defaultProps = {
  type: 'Other',
};

export default withTheme(NoticeType);