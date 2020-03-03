import React from 'react';
import styled from 'styled-components';
import { ExternalLink } from '../../atoms';

const ServiceMessageLineMessage = styled.div`
  position: absolute;
  bottom: 8px;
  width: 100%;
  padding-top: 8px;
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  border-top: 1px solid ${props => props.theme.navInactive};
`;

const ServiceMessageLine = () => {
  return (
    <ServiceMessageLineMessage>
      Bulles devient Dismoi -{' '}
      <ExternalLink href="http://www.dismoi.io/bulles-dismoi">
        en savoir plus
      </ExternalLink>
    </ServiceMessageLineMessage>
  );
};

export default ServiceMessageLine;
