import styled from 'styled-components';

export default styled.p`
    width: 100%;
    margin: 0;
    text-align: center;
    color: ${props => props.theme.deletedText};
    font-weight: bold;
`;


