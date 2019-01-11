import styled from 'styled-components';

export default styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: auto;
    font-size: 14px;

    & svg {
        margin-right: 3px;
        stroke: ${props => props.theme.secondaryColor};
        fill: #fff;
        vertical-align: middle
    }

    & a {
        color: ${props => props.theme.navInactive};

        & + a {
            margin-left: 20px;
        }

        &:hover {
            svg {
                fill: ${props => props.theme.secondaryColor};
            }
        }
    }
`;
