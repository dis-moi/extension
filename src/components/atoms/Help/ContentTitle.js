import styled from 'styled-components';

export default styled.h2`
    margin: 0 0 10px;
    font-size: 14px;
    font-weight: bold;
    color: ${props => props.theme.primaryColor};
    text-transform: uppercase;
`;