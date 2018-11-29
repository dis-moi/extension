import React from 'react';
import styled from 'styled-components';
import BubbleIcon from '../atoms/icons/Bubble';
import ArrowIcon from '../atoms/icons/Arrow';

export const AddBulle = styled.a`
    display: flex;
    width: 100%;
    font-size: 14px;
    font-weight: bold;
    color: ${props => props.theme.mainText};

    svg + span {
      margin-left: 10px;
    }

    span + svg {
      margin-left: auto;
      transform: rotate(180deg)
    }
`;

export default () => (
  <AddBulle>
    <BubbleIcon />
    <span>Ajouter une bulle</span>
    <ArrowIcon />
  </AddBulle>
);
