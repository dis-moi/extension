import React, { AnchorHTMLAttributes, Ref } from 'react';
import styled from 'styled-components';
import { LocationState, LocationDescriptor } from 'history';
import { Link as ReactRouterDomLink } from 'react-router-dom';
import Anchor, { style } from './Anchor';

interface LinkProps<S = LocationState>
  extends AnchorHTMLAttributes<HTMLAnchorElement> {
  to?: LocationDescriptor<S>;
  replace?: boolean;
  innerRef?: Ref<HTMLAnchorElement>;
  className?: string;
}

const Link = ({ to, ...props }: LinkProps) =>
  to ? <ReactRouterDomLink to={to} {...props} /> : <Anchor {...props} />;

export default styled(Link)`
  ${style}
  font-weight: normal;
  text-decoration: none;

  @media (max-width: ${props => props.theme.tabletWidth}) {
    font-size: 18px;
  }
`;
