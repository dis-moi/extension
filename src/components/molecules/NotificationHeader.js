import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import { withRouter } from 'react-router';
import {
  BackButton, CloseButton, Logo, NotificationHeaderContainer, Title
} from '../atoms';

const NotificationHeader = ({
  title, onBack, onClose, theme, history
}) => {
  const handleBack = onBack || history.goBack;

  return (
    <NotificationHeaderContainer theme={theme}>
      {history.index > 0
        && <BackButton onClick={handleBack} />
      }
      {title ? (
        <Title>{title}</Title>
      ) : (
        <Logo />
      )}
      <CloseButton onClick={onClose} />
    </NotificationHeaderContainer>
  );
};

NotificationHeader.propTypes = {
  title: PropTypes.string,
  onBack: PropTypes.func,
  onClose: PropTypes.func,
  theme: PropTypes.objectOf(PropTypes.any).isRequired,
};

NotificationHeader.defaultProps = {
  title: null,
  onBack: null,
  onClose: () => {},
};

export default withRouter(withTheme(NotificationHeader));
