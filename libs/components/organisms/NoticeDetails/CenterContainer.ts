import styled from 'styled-components';
import { BorderButton, CenterContainer } from 'libs/components/atoms';

export default styled(CenterContainer)`
  margin-bottom: 15px;

  ${BorderButton} {
    margin-left: 20px;
  }
`;
