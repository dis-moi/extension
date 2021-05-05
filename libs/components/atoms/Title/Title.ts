import styled from 'styled-components';
import { Index } from '../../../theme';

interface H2Props {
  align?: 'right' | 'left' | 'center';
  theme: Index;
}

export default styled.h2<H2Props>`
  font-size: 22px;
  font-weight: bold;
  color: ${props => props.theme.secondaryColor};
  text-align: ${props => props.align || 'center'};
`;
