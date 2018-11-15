import styled from 'styled-components';

export default styled.main`
    background-color: #fff;
    border-left: 6px solid ${props => props.theme.otherText};
    border-radius: 5px;
    box-shadow: 0 4px 20px 0 rgba(37,38,94,0.15);
`;