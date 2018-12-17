import styled from 'styled-components';

export default styled.a`
    box-sizing: border-box;
    width: 40px;
    padding-top: 5px;
    padding-bottom: 6px;
    text-align: center;
    border-top: 2px solid ${props => props.theme.activeColor};

    & > svg {
        height: 28px;
        fill: ${props => props.theme.activeColor};
    }
`;