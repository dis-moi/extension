import styled from 'styled-components';

export default styled.p`
    display: inline-block;
    margin:0;
    padding: 1em 1em 1em 0;
    font-size: 1.5em;
    color: ${props => props.theme.otherText};
`;