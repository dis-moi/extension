import styled from 'styled-components';
import { ExternalLink } from 'components/atoms';

export default styled.article`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 100%;
  padding-bottom: 38px;
  text-align: center;

  & ${ExternalLink} {
    display: block;
    font-weight: bold;
  }
`;
