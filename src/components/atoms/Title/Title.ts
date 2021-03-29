import styled from 'styled-components';
import { Theme } from '../../../app/theme';

interface H2Props {
  align?: 'right' | 'left' | 'center';
  theme: Theme;
}

export default styled.h2<H2Props>`
  font-size: 22px;
  font-weight: bold;
  color: ${props => props.theme.secondaryColor};
  text-align: ${props => props.align || 'center'};
`;
