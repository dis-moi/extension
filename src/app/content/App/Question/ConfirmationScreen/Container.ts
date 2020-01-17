import styled from 'styled-components';
import { ExternalLink } from 'components/atoms';

export default styled.article`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 300px;
  height: 100%;
  margin-right: auto;
  margin-left: auto;
  padding-bottom: 38px;
  text-align: center;

  & ${ExternalLink} {
    display: block;
    font-weight: bold;
  }
`;
