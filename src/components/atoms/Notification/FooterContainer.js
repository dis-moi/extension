import styled from 'styled-components';

export default styled.nav`
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    max-height: 40px;
    min-height: 40px;
    padding-right: 38px;
    padding-bottom: 5px;
    padding-left: 38px;
    margin-top: auto;
    border-top: 1px solid ${props => props.theme.bottomBar};
`;