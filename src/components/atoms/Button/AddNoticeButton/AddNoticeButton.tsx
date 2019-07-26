import React from 'react';
import styled from 'styled-components';
import BorderButton from '../BorderButton';
import AddIcon from './AddIcon';
import { ButtonProps } from '../Button';

const ButtonLink = styled(BorderButton)<ButtonProps>`
  display: flex;
  align-items: center;
  color: ${props => props.theme.secondaryColor};
  text-transform: uppercase;
  border-color: #fff;

  & > svg {
    width: 12px;
    height: 12px;
    margin-right: 5px;
    fill: ${props => props.theme.secondaryColor};
  }

  &:hover {
    background-color: ${props => props.theme.secondaryColor};
    border-color: ${props => props.theme.secondaryColor};

    & > svg {
      fill: #fff;
    }
  }
`;

export default ({ ...props }) => (
  <ButtonLink
    as="a"
    href="https://form.jotformeu.com/82702852284358"
    target="_blank"
    rel="noopener noreferrer"
    {...props}
  >
    <AddIcon />
    Créer votre bulle
  </ButtonLink>
);
