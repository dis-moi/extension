import styled from 'styled-components';

export default styled.a`
    color: ${props => props.theme.link};

    &,
    & > span {
        text-decoration: underline;
    }

    & > span {
        vertical-align: bottom;
    }
`;
