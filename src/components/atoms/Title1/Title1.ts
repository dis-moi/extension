import styled from 'styled-components';

export default styled.h1`
  width: 100%;
  height: 42px;
  font-size: 34px;
  line-height: 1.236;
  font-weight: bold;
  color: ${props => props.theme.activeColor};
  text-align: center;
`;
