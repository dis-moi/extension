import React from 'react';
import styled from 'styled-components';
import { Link } from 'components/atoms';
import { Plus } from '../../icons';

const LinkNoNotice = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 13px;
  color: ${props => props.theme.activeColor};

  &:hover {
    color: ${props => props.theme.primaryColor};
  }

  & > svg {
    margin-right: 10px;
  }
`;

export default () => (
  <LinkNoNotice to="/contribute">
    <Plus />
    Poster une info, un conseil
  </LinkNoNotice>
);
