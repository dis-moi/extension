import styled from 'styled-components';

export default styled.h1.attrs({ children: 'Bulles' })`
    margin:0;
    font-size: 1.6em;
    color: ${props => props.theme.otherText};
`;