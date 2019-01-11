import styled from 'styled-components';

export default styled.a`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    width: 338px;
    min-height: 85px;
    padding: 12px 12px 12px 13px;
    margin-right: 11px;
    margin-left: 5px;
    background-color: #fff;
    border-radius: 15px;
    border: 2px solid transparent;

    &:hover {
        border-color: ${props => props.theme.activeColor}
    }

    & > div + div {
        width: 245px;
    }

    & > a {
        transform: rotate(180deg)
    }
`;