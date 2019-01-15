import styled from 'styled-components';

export default styled.div`
    display: flex;

    & [class^="Contributor"] {
        font-size: 14px;
        font-weight: bold;
        color: ${props => props.theme.primaryColor}
    }
`;