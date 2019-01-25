import styled from 'styled-components';

export default styled.h2`
    font-size: 14px;
    font-weight: bold;
    color: ${props => props.theme.secondaryColor};
    text-transform: uppercase;
    text-align: center;
`;