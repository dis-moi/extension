import React from 'react';
import styled from 'styled-components';
import { Link } from 'components/atoms';

const LinkNoNotice = styled(Link)`
  display: inline-block;
  padding: 3px 12px;
  font-weight: 900;
  line-height: 1;
  text-decoration: none;
  text-transform: none;
  background-color: #fff;
  border-radius: ${props => props.theme.radius};

  &:hover {
    color: #fff;
  }
`;

export default () => <LinkNoNotice to="/contribute">Poster</LinkNoNotice>;
