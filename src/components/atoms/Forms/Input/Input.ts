import styled from 'styled-components';

interface Props {
  error?: boolean;
}

export default styled.input<Props>`
  box-sizing: border-box;
  width: 100%;
  margin-bottom: 10px;
  padding: 4px 10px 4px 14px;
  font-size: 12px;
  line-height: 1;
  border-radius: 6px;
  border: 1px solid
    ${props =>
      props.error ? props.theme.formError : props.theme.secondaryColor};
  box-shadow: 0 0 0 2px
    ${props => (props.error ? props.theme.formError : '#fff')};
  resize: none;
`;
