import styled from 'styled-components';

export default styled.main` 
  position: relative;
  height: 342px;
  background-color: ${props => (props.notices ? props.theme.listBg : props.theme.accountListBg)};
`;