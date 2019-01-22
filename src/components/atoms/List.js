import styled from 'styled-components';

export default styled.ul`
    margin: 0 0 20px;
    padding: 0 0 0 19px;
    font-size: 13px;
    line-height: 1.45;

    a {
        font-weight: 500;
        color: ${props => props.theme.activeColor};
    }
`;