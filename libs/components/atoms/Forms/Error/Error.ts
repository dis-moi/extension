import styled from 'styled-components';

export default styled.p`
  margin-top: 0;
  font-size: 13px;
  line-height: 1;
  color: ${props => props.theme.formError};
  font-weight: bold;
  text-align: center;
`;
