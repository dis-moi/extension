import styled from 'styled-components';

export default styled.h2`
    margin: 12px 0 0;
    font-size: 14px;
    font-weight: bold;
    color: ${props => props.theme.secondaryColor};
    text-transform: uppercase;
    text-align: center;
`;