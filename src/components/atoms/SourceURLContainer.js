import styled from 'styled-components';

export default styled.a`
    color: ${props => props.theme.activeColor};
    cursor: pointer;
    transition: all .2s ease-in-out;

    &,
    & > span {
        text-decoration: underline;
    }

    & > span {
        vertical-align: bottom;
    }

    &:hover {
        color: ${props => props.theme.secondaryColor};
    }
`;
