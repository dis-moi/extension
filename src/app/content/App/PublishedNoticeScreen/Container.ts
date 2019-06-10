import styled from 'styled-components';
import { CenterContainer, ExternalLink } from 'components/atoms/';

export default styled.article`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  padding-bottom: 38px;
  text-align: center;

  & ${CenterContainer} {
    margin-top: auto;
  }

  & ${ExternalLink} {
    display: block;
    font-weight: bold;
  }
`;
