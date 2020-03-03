import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { style } from './Anchor';
import { Theme } from 'app/theme';

export default styled(Link)`
  ${({ theme }: { theme: Theme }) => style({ theme })}
`;
