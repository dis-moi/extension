import styled from 'styled-components';

const Paragraph = styled.p`
  margin: 0;
  font-size: ${props => props.theme.fontSize};
  color: ${props => props.theme.textColor};
`;

export default Paragraph;
