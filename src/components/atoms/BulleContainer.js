import styled from 'styled-components';

export default styled.article`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-size: ${props => (props.details ? '15px' : '16px')};

    &:first-of-type {
        margin-top: 18px;
    }

    & + & {
        margin-top: 18px;
    }
`;
