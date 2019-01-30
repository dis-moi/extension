import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import { withRouter } from 'react-router';
import {
  BackButton, CloseButton, Logo, NotificationHeaderContainer, Title
} from '../atoms';
import { truncateButPreserveWords } from '../../app/utils/truncate';
import removeHtml from '../../app/utils/removeHtml';

const NotificationHeader = ({
  title, goBack, close, theme, history
}) => {
  const handleGoBack = goBack || history.goBack;

  return (
    <NotificationHeaderContainer theme={theme}>
      {history.index > 0
        && <BackButton onClick={handleGoBack} />
      }
      {title ? (
        <Title title={title}>{truncateButPreserveWords(removeHtml(title), 34)}</Title>
      ) : (
        <Logo />
      )}
      <CloseButton onClick={close} />
    </NotificationHeaderContainer>
  );
};

NotificationHeader.propTypes = {
  title: PropTypes.string,
  goBack: PropTypes.func,
  close: PropTypes.func,
  theme: PropTypes.objectOf(PropTypes.any).isRequired,
};

NotificationHeader.defaultProps = {
  title: null,
  goBack: null,
  close: () => {},
};

export default withRouter(withTheme(NotificationHeader));
