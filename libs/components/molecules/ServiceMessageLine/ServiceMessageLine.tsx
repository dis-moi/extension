import React from 'react';
import styled from 'styled-components';
import { ExternalLink } from '../../atoms';

const ServiceMessageLineMessage = styled.div`
  position: absolute;
  bottom: 12px;
  width: 100%;
  padding-top: 12px;
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  border-top: 1px solid ${props => props.theme.navInactive};
`;

const ServiceMessageLine = () => {
  return (
    <ServiceMessageLineMessage>
      15/03/2020 : Bulles devient Dismoi -{' '}
      <ExternalLink href="https://www.dismoi.io/bulles-dismoi">
        en savoir plus
      </ExternalLink>
    </ServiceMessageLineMessage>
  );
};

export default ServiceMessageLine;
