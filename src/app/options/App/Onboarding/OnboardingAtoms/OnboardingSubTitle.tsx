import styled from 'styled-components';

const SubTitle = styled.h2`
  width: 580px;
  max-width: 100%;
  margin: 0 auto 40px;
  font-size: 22px;
  color: ${props => props.theme.activeColor};
  font-weight: 500;
`;

export default SubTitle;
