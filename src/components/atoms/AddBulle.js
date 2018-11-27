import React from 'react';
import styled from 'styled-components';
import BulleContainer from './BulleContainer';
import BubbleIcon from './icons/Bubble';

export default styled(BulleContainer).attrs({ children: 'Ajouter une bulle' })`
    font-size: 14px;
    font-weight: bold;
    color: ${props => props.theme.mainText}
`;