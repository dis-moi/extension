import styled from 'styled-components';
import { ExternalLink } from 'components/atoms';

export default styled.article`
  height: 100%;
  text-align: center;

  & ${ExternalLink} {
    display: block;
    font-weight: bold;
  }
`;
