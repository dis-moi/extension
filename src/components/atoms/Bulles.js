import styled from 'styled-components';

export default styled.article`
    padding: 16px 25px 16px 20px;

    & + & {
        border-top: 1px solid rgba(188,188,201,0.20)
    }
`;
