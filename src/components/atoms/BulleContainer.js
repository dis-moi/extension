import styled from 'styled-components';

export default styled.article`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.6em 2.5em 1.6em 2.0em;
    font-size: ${props => (props.details ? '1.5em' : '1.4em')};

    & + & {
        border-top: 1px solid rgba(188,188,201,0.20)
    }
`;
