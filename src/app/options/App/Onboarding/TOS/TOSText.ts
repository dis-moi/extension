import styled from 'styled-components';

const TOSText = styled.p`
  font-size: 16px;

  a {
    color: ${props => props.theme.primaryColor};
  }
`;

export default TOSText;
