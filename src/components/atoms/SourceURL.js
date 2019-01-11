import styled from 'styled-components';

export default styled.a`
    color: ${props => props.theme.secondaryColor};
    cursor: pointer;

    &,
    & > span {
        text-decoration: underline;
    }

    & > span {
        vertical-align: bottom;
    }

    &:hover {
        color: ${props => props.theme.activeColor};
    }
`;
