import styled from 'styled-components';

export default styled.a`
    color: ${props => props.theme.secondaryColor};

    &,
    & > span {
        text-decoration: underline;
    }

    & > span {
        vertical-align: bottom;
    }
`;
