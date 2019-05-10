import styled from 'styled-components';

export default styled.textarea`
  box-sizing: border-box;
  width: 100%;
  height: 87px;
  margin-bottom: 10px;
  padding: 10px;
  font-size: 13px;
  border-radius: 6px;
  border: 1px solid ${props => props.theme.secondaryColor};
  resize: none;
  font-style: italic;
`;
