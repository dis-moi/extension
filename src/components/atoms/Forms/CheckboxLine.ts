import styled from 'styled-components';
import { Label } from './index';

const CheckboxLine = styled.div`
  display: flex;
  align-items: center;

  &:not(:last-of-type) {
    margin-bottom: 8px;
  }

  ${Label} {
    margin-left: 8px;
  }
`;

export default CheckboxLine;
