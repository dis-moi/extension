import styled from 'styled-components';

interface Props {
  error?: boolean;
}

export default styled.textarea<Props>`
  box-sizing: border-box;
  width: 100%;
  margin-bottom: 10px;
  padding: 8px 10px 10px 14px;
  font-size: 13px;
  border-radius: 6px;
  border: 1px solid
    ${props =>
      props.error ? props.theme.formError : props.theme.secondaryColor};
  box-shadow: inset 0px 0px 0px 2px
    ${props => (props.error ? props.theme.formError : '#fff')};
  resize: none;

  &,
  ::placeholder {
    font-family: 'Lato', sans-serif;
  }
`;
