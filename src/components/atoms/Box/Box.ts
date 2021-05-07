import styled from 'styled-components';

const Box = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 20px;
  background-color: white;
  border-radius: ${props => props.theme.radiusM};

  & + & {
    margin-top: 20px;
  }
`;

export default Box;
