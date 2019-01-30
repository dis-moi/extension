import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { sanitize } from 'dompurify';

export const MessageContainer = styled.div`
    p {
        margin: 6px 0 12px;
        font-size: 15px;
        line-height: 1.4;
        color: ${props => props.theme.primaryColor}
    }
`;

// eslint-disable-next-line react/no-danger
export const Message = ({ children }) => (
  <MessageContainer dangerouslySetInnerHTML={{ __html: sanitize(children) }} />
);

Message.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Message;