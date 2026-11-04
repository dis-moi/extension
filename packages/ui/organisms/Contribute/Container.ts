import styled from 'styled-components';
import { ExternalLink } from '@dismoi/ui/atoms';

export default styled.article`
  height: 100%;
  text-align: center;

  & ${ExternalLink} {
    display: block;
    font-weight: bold;
  }
`;
