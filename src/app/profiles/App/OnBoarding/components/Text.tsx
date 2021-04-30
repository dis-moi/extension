import styled from 'styled-components';
import { Paragraph } from 'components/atoms';

const Text = styled(Paragraph)`
  margin-bottom: 16px;
  font-size: 21px;
  font-weight: 600;
  color: ${props => props.theme.colorPrimary};
`;

export default Text;
