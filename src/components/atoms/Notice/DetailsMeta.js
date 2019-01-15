import styled from 'styled-components';

export default styled.div`
    display: flex;
    align-items: center;

    time,
    div:not(:last-child) {
        margin-right: 6px;
    }

    & [class^="TypeBackground"] {
        width: 23px;
        height: 23px;

        svg {
            width: 14px;
            height: 13px;
        }

        &[color="${props => props.theme.other}"] {
            svg {
                width: 17px;
                height: 17px;
            }
        }
    }
`;