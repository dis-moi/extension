import styled from 'styled-components';

export default styled.button`
    box-sizing: border-box;
    padding:0;
    font-weight: bold;
    line-height: 1;
    color: ${props => props.theme.secondaryColor};
    text-transform: uppercase;
    text-decoration: underline;
    background: none;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
        color: ${props => props.theme.activeColor}
    }
    
    &:focus {
        outline: 1px dotted ${props => props.theme.activeColor};
    }
`;
