import styled from 'styled-components';

// should be moved to organisms due to Contributor override 
export default styled.div`
    display: flex;

    & [class^="Contributor"] {
        font-size: 14px;
        font-weight: bold;
        color: ${props => props.theme.primaryColor}
    }
`;