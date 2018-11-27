import React from 'react';
import styled from 'styled-components';
import DeleteIcon from './icons/Delete';

export default styled.div.attrs({ children: <DeleteIcon /> })`
    margin-left: auto;
    color: ${props => props.theme.otherText};
    
`;
