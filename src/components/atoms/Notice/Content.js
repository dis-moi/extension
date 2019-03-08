import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Content = ({ to, ...props }) => {
  if (to) {
    return (<Link to={to} {...props} />);
  }

  return (<div {...props} />);
};

export default styled(Content)`
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    width: 338px;
    min-height: 85px;
    padding: 12px 12px 12px 13px;
    margin-right: 11px;
    margin-left: 5px;
    text-decoration: none;
    background-color: #fff;
    border-radius: 15px;
    border: 2px solid transparent;
    transition: all 0.2s ease-in-out;

    &[href]:hover {
        border-color: ${props => props.theme.activeColor}
    }

    & > div:nth-child(2) {
        width: 245px;
    }

    & [class^="OpenButton"] {
        height: auto;
        transform: rotate(180deg)
    }

    & > button {
        margin-right: auto;
        margin-left: auto;
        font-size: 12px;
        color: ${props => props.theme.secondaryColor};
        text-align: center;

        &:hover {
            color: ${props => props.theme.activeColor}
        }
    }
`;