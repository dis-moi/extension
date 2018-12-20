import styled from 'styled-components';

export default styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: auto;
    font-size: 14px;

    & svg {
        margin-right: 3px;
        fill: ${props => props.theme.navInactive};
        vertical-align: middle
    }

    & a {
        color: ${props => props.theme.navInactive}
    }

    & a + a {
        margin-left: 20px;
    }
`;
