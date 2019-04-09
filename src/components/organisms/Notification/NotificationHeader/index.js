import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { truncateButPreserveWords } from 'app/utils/truncate';
import removeHtml from 'app/utils/removeHtml';
import Container from './Container';
import LogoContainer from './LogoContainer';
import LogoImg from './LogoImg';
import BackButton from './BackButton';
import CloseButton from './CloseButton';
import Title from './Title';

const NotificationHeader = ({
  title, goBack, close, history
}) => {
  const handleGoBack = goBack || history.goBack;

  return (
    <Container>
      {history.index > 0
        && <BackButton onClick={handleGoBack} />
      }
      {title ? (
        <Title title={title}>{truncateButPreserveWords(removeHtml(title), 34)}</Title>
      ) : (
        <LogoContainer>
          <LogoImg />
        </LogoContainer>
      )}
      <CloseButton onClick={close} />
    </Container>
  );
};

NotificationHeader.propTypes = {
  title: PropTypes.string,
  goBack: PropTypes.func,
  close: PropTypes.func,
};

NotificationHeader.defaultProps = {
  title: null,
  goBack: null,
  close: () => {},
};

export { NotificationHeader };

export default withRouter(NotificationHeader);
