import styled from 'styled-components';

export default styled.h2`
    margin: 15px 0 0;
    font-size: 38px;
    font-family: 'Sedgwick Ave', cursive;
    font-weight: normal;
    color: ${props => props.theme.error};
`;