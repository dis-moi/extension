import styled from 'styled-components';

export default styled.main` 
  position: relative;
  height: 100%;
  background-color: ${props => (props.notices ? props.theme.listBg : props.theme.accountListBg)};
`;