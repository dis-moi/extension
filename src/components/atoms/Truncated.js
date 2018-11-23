import styled from 'styled-components';

export default styled.span`
    width: ${props => props.width};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline-block;
`;