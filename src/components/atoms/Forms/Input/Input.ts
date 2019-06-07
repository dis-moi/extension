import styled from 'styled-components';

export default styled.input`
  box-sizing: border-box;
  width: 100%;
  margin-bottom: 10px;
  padding: 8px 10px 10px 14px;
  font-size: 13px;
  line-height: 1;
  border-radius: 6px;
  border: 1px solid ${props => props.theme.secondaryColor};
  resize: none;

  ::placeholder {
    font-style: italic;
  }
`;
