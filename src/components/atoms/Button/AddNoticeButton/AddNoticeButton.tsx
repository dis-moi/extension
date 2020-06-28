import React from 'react';
import styled from 'styled-components';
import { Link } from 'components/atoms';
import { Plus } from '../../icons';

const LinkNoNotice = styled(Link)`
  display: flex;
  align-items: center;
  height: 28px;
  padding: 0 12px;
  font-size: 13px;
  color: ${props => props.theme.activeColor};
  border-radius: 7px;
  border: 2px solid ${props => props.theme.button};
  text-decoration: none;

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
