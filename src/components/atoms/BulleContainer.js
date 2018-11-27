import styled from 'styled-components';

export default styled.article`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    padding: 18px 35px 15px 30px;
    min-height: 75px;
    font-size: ${props => (props.details ? '1.5em' : '1.4em')};

    & + & {
        border-top: 1px solid rgba(188,188,201,0.20)
    }
`;
