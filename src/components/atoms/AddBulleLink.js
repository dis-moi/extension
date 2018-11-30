import styled from 'styled-components';

export default styled.a`
    display: flex;
    width: 100%;
    font-size: 14px;
    font-weight: bold;
    color: ${props => props.theme.mainText};

    svg + span {
      margin-left: 10px;
    }

    span + svg {
      margin-left: auto;
      transform: rotate(180deg)
    }
`;