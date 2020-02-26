import React from 'react';
import styled from 'styled-components';
import { BackgroundButton } from 'components/atoms';
import { LinkType, ServiceMessageAction } from 'app/lmem/ServiceMessage';
import { Link } from 'react-router-dom';

const Button = styled(BackgroundButton)`
  margin-left: auto;
  margin-right: auto;
  display: inline-block;
  text-align: center;
  text-transform: uppercase;
  padding-top: 4px;
  height: auto;
  color: #fff;
  text-decoration: none;
  transition: all 0.2s ease-in-out;
`;

interface ServiceMessageActionProps extends ServiceMessageAction {
  openOnboarding: (pathname: string) => () => void;
}

const ServiceMessageActionButton = ({
  type,
  label,
  url,
  openOnboarding
}: ServiceMessageActionProps) => {
  switch (type) {
    case LinkType.External:
      return (
        <Button as="a" href={url} target="_blank" rel="noopener noreferrer">
          {label}
        </Button>
      );
    case LinkType.Options:
      return <Button onClick={openOnboarding(url)}>{label}</Button>;
    case LinkType.Internal:
    default:
      return (
        <Button as={Link} to={url}>
          {label}
        </Button>
      );
  }
};

export default ServiceMessageActionButton;
