import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export const Section = styled.section`
    display: flex;
    flex-direction: column;
    max-width: 384px;
    height: 414px;
    font-size: 10px;
    font-family: 'Lato', sans-serif;
    color: ${props => props.theme.primaryColor};
    background-color: #fff;
    border-radius: 7px;
    box-shadow: 0 3px 6px 0 rgba(0,0,0,.58);
`;

export default Section;
