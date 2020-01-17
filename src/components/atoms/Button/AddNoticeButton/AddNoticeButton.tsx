import React from 'react';
import styled from 'styled-components';
import { Link } from 'components/atoms';
import { Write } from '../../icons';

const LinkNoNotice = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 13px;
  color: ${props => props.theme.activeColor};

  &:hover {
    color: ${props => props.theme.primaryColor};
  }
`;

export default () => (
  <LinkNoNotice to="/contribute">
    <Write />
    Poster une information
  </LinkNoNotice>
);
