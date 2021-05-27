import styled from 'styled-components';
import { Paragraph } from 'components/atoms/index';

export default styled(Paragraph)`
  font-size: 13px;
  color: ${props => props.theme.formError};
  font-weight: bold;
`;
